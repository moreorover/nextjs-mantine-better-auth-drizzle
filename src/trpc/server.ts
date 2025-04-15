import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";

import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import type { AppRouter } from "@/trpc/routers/_app";
import { headers } from "next/headers";
import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
	const headersList = await headers();
	return createTRPCContext({
		headers: headersList,
	});
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
	caller,
	getQueryClient,
);
