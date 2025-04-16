import { someRouter } from "@/server/api/routers/some";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	some: someRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
