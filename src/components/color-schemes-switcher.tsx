"use client";

import { LoaderSkeleton } from "@/components/loader-skeleton";
import { api } from "@/trpc/react";
import { Button, Group, useMantineColorScheme } from "@mantine/core";
import { Suspense } from "react";

export function ColorSchemesSwitcher() {
	return (
		<Suspense fallback={<LoaderSkeleton />}>
			<ColorSuspenseSwitcher />
		</Suspense>
	);
}

function ColorSuspenseSwitcher() {
	const { setColorScheme, clearColorScheme } = useMantineColorScheme();
	const [publicData] = api.some.helloPublic.useSuspenseQuery();
	// const [privateData] = api.some.helloPrivate.useSuspenseQuery();
	return (
		<Group>
			<Button>{publicData}</Button>
			{/*<Button>{privateData}</Button>*/}
			<Button onClick={() => setColorScheme("light")}>Light</Button>
			<Button onClick={() => setColorScheme("dark")}>Dark</Button>
			<Button onClick={() => setColorScheme("auto")}>Auto</Button>
			<Button onClick={clearColorScheme}>Clear</Button>
		</Group>
	);
}
