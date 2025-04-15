import { ColorSchemesSwitcher } from "@/components/color-schemes-switcher";
import { HydrateClient } from "@/trpc/server";

export default function Page() {
	return (
		<HydrateClient>
			<ColorSchemesSwitcher />
		</HydrateClient>
	);
}
