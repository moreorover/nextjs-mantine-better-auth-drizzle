"use client";

import { LoaderSkeleton } from "@/components/loader-skeleton";
import { api } from "@/trpc/react";
import { Button, Group } from "@mantine/core";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function TrpcExample() {
	return (
		<Group>
			<Suspense fallback={<LoaderSkeleton />}>
				<ErrorBoundary fallback={<p>Error</p>}>
					<PublicButton />
				</ErrorBoundary>
			</Suspense>
			<Suspense fallback={<LoaderSkeleton />}>
				<ErrorBoundary fallback={<p>Error</p>}>
					<PrivateButton />
				</ErrorBoundary>
			</Suspense>
		</Group>
	);
}

function PrivateButton() {
	const [privateData] = api.some.helloPrivate.useSuspenseQuery();
	return <Button>{privateData}</Button>;
}

function PublicButton() {
	const [publicData] = api.some.helloPublic.useSuspenseQuery();
	return <Button>{publicData}</Button>;
}
