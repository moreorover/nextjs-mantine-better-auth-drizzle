"use client";

import { Container, Group, Stack, Tabs, UnstyledButton } from "@mantine/core";

import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();
	return (
		<Container size="xs">
			<Stack gap="xs">
				<Group justify="center">
					<UnstyledButton onClick={() => router.push("/")}>
						<Icon icon="lucide:cherry" width="48" height="48" />{" "}
					</UnstyledButton>
				</Group>
				<Group justify="center">
					<p>Welcome back!</p>
				</Group>
				<Tabs defaultValue="sign-in">
					<Tabs.List>
						<Tabs.Tab value="sign-in">Sign In</Tabs.Tab>
						<Tabs.Tab value="sign-up">Sign Up</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="sign-in">
						<SignIn />
					</Tabs.Panel>

					<Tabs.Panel value="sign-up">
						<SignUp />
					</Tabs.Panel>
				</Tabs>
			</Stack>
		</Container>
	);
}
