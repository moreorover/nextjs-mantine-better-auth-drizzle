import { headers } from "next/headers";
import { redirect } from "next/navigation";

import UserCard from "@/components/profile/user-card";
import { auth } from "@/lib/auth";

export default async function Page() {
	const [session, activeSessions] = await Promise.all([
		auth.api.getSession({
			headers: await headers(),
		}),
		auth.api.listSessions({
			headers: await headers(),
		}),
	]).catch((e) => {
		console.log(e);
		throw redirect("/sign-in");
	});
	return <UserCard session={session} activeSessions={activeSessions} />;
}
