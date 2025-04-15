import { auth } from "@/lib/auth";
import { AdminView } from "@/modules/admin/ui/views/admin-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/sign-in");
	}

	if (session.user.role !== "admin") {
		redirect("/profile");
	}

	return <AdminView />;
}
