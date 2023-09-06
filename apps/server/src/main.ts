import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from './trpc/trpc.router';

async function bootstrap() {
  //使用NestFactory.create方法创建了一个Nest应用程序的实例，并将其存储在app变量中; 这个实例是我们应用程序的根容器，我们可以通过它来配置和管理应用程序的各种功能。
  const app = await NestFactory.create(AppModule);
  // 启用跨域资源共享（CORS）中间件，用于允许来自不同域的客户端请求访问我们的应用程序
  // 从应用程序的容器中获取 tRPC路由器 TrpcRouter
  // 将 tRPC 路由器的中间件应用到我们的应用程序中。这样，我们的应用程序就可以处理tRPC请求了。
  app.enableCors();
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  // 从环境变量中获取端口号, 否则使用 4000 作为默认的端口号
  // await app.listen(3000);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
