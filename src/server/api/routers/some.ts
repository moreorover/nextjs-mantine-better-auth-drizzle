import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";

export const someRouter = createTRPCRouter({
	helloPublic: publicProcedure.query(async () => {
		return "Hello Public World!";
	}),
	helloPrivate: protectedProcedure.query(async () => {
		return "Hello Private World!";
	}),
});
