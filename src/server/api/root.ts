import { createCallerFactory } from "@/server/api/trpc";
import { appRouter } from "@/trpc/routers/_app";

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
