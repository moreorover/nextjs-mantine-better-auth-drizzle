"use client";

import { LoaderSkeleton } from "@/components/loader-skeleton";
import { api } from "@/trpc/react";
import { Button, Group, useMantineColorScheme } from "@mantine/core";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function ColorSchemesSwitcher() {
	return (
		<>
			<Suspense fallback={<LoaderSkeleton />}>
				<ErrorBoundary fallback={<p>Error</p>}>
					<ColorSuspenseSwitcher />
				</ErrorBoundary>
			</Suspense>
			<Suspense fallback={<LoaderSkeleton />}>
				<ErrorBoundary fallback={<p>Error</p>}>
					<PrivateButton />
				</ErrorBoundary>
			</Suspense>
		</>
	);
}

function ColorSuspenseSwitcher() {
	const { setColorScheme, clearColorScheme } = useMantineColorScheme();
	const [publicData] = api.some.helloPublic.useSuspenseQuery();
	return (
		<Group>
			<Button>{publicData}</Button>

			<Button onClick={() => setColorScheme("light")}>Light</Button>
			<Button onClick={() => setColorScheme("dark")}>Dark</Button>
			<Button onClick={() => setColorScheme("auto")}>Auto</Button>
			<Button onClick={clearColorScheme}>Clear</Button>
		</Group>
	);
}

function PrivateButton() {
	const [privateData] = api.some.helloPrivate.useSuspenseQuery();
	return <Button>{privateData}</Button>;
}
