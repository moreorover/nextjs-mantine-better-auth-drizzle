import { ColorSchemesSwitcher } from "@/components/color-schemes-switcher";
import { TrpcExample } from "@/components/trpc-example";
import { HydrateClient, api } from "@/trpc/server";
import { Container, Stack } from "@mantine/core";

export const dynamic = "force-dynamic";

export default async function Page() {
	void api.some.helloPublic.prefetch();
	return (
		<HydrateClient>
			<Container size="md">
				<Stack>
					<ColorSchemesSwitcher />
					<TrpcExample />
				</Stack>
			</Container>
		</HydrateClient>
	);
}
