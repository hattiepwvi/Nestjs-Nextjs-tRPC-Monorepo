import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@server/trpc/trpc.router";

/**
 * 创建一个 TRPC 代理客户端，并配置了它与 TRPC 服务器的通信方式
 *   - 使用 @trpc/client 库 的 createTRPCProxyClient 函数来创建一个 TRPC（Typed RPC）代理客户端
 *   - createTRPCProxyClient 函数接受一个泛型参数 AppRouter，这样在创建客户端时指定要使用的路由类型。
 *   - 传递一个包含 httpBatchLink 的 links 数组来配置客户端的链接
 *   - httpBatchLink 用于发送 HTTP 请求的链接，它将请求发送到指定的 URL。
 */
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/trpc`, // TODO: use env var
    }),
  ],
});
