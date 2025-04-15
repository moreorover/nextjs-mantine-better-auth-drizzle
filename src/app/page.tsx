import { ColorSchemesSwitcher } from "@/components/color-schemes-switcher";
import { HydrateClient, api } from "@/trpc/server";

export const dynamic = "force-dynamic";

export default async function Page() {
	void api.some.helloPublic.prefetch();
	return (
		<HydrateClient>
			<ColorSchemesSwitcher />
		</HydrateClient>
	);
}
