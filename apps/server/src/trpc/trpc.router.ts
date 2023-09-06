import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(z.object({ name: z.string().optional() }))
      .query(({ input }) => {
        return `Hello ${input.name ? input.name : 'Bilbo'}!`;
      }),
  });

  /** applyMiddleware：tRPC 的 Express 中间件，让 nest 能够应用 tRPC 路由
   * 请求将被传递给 tRPC 路由处理。
   * 导出 AppRouter 方便在其他地方使用 tRPC 路由对象。
   */

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
