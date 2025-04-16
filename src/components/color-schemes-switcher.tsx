"use client";

import { LoaderSkeleton } from "@/components/loader-skeleton";
import { Button, Group, useMantineColorScheme } from "@mantine/core";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function ColorSchemesSwitcher() {
	return (
		<Suspense fallback={<LoaderSkeleton />}>
			<ErrorBoundary fallback={<p>Error</p>}>
				<ColorSuspenseSwitcher />
			</ErrorBoundary>
		</Suspense>
	);
}

function ColorSuspenseSwitcher() {
	const { setColorScheme, clearColorScheme } = useMantineColorScheme();
	return (
		<Group>
			<Button onClick={() => setColorScheme("light")}>Light</Button>
			<Button onClick={() => setColorScheme("dark")}>Dark</Button>
			<Button onClick={() => setColorScheme("auto")}>Auto</Button>
			<Button onClick={clearColorScheme}>Clear</Button>
		</Group>
	);
}
