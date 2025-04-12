import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/lib/auth";

const authHandler = toNextJsHandler(auth);

function withLogging(
  handler: (request: Request) => Promise<Response>,
): (request: Request) => Promise<Response> {
  return async (request: Request): Promise<Response> => {
    console.log(`Request received: ${request.method} ${request.url}`);

    return handler(request);
  };
}

export const GET = withLogging(authHandler.GET);
export const POST = withLogging(authHandler.POST);
