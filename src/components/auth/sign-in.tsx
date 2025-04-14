import {
	Anchor,
	Button,
	Card,
	Checkbox,
	Container,
	Group,
	PasswordInput,
	Text,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";

import { authClient } from "@/lib/auth-client";
import { signInSchema } from "@/lib/auth-schema";

export default function SignIn() {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		validate: zodResolver(signInSchema),
	});

	async function handleSubmit(values: typeof form.values) {
		const { email, password, rememberMe } = values;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { data, error } = await authClient.signIn.email(
			{
				email,
				password,
				rememberMe,
				callbackURL: "/profile",
			},
			{
				onRequest: () => {
					// toast({
					//   title: "Please wait...",
					// });
				},
				onSuccess: () => {
					form.reset();
				},
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				onError: (ctx) => {
					notifications.show({
						color: "red",
						title: "Sign In Failed",
						message: "Please make sure your email and password is correct.",
					});
				},
			},
		);
	}

	return (
		<Container py={12}>
			<Card shadow="sm" padding="lg" radius="md" withBorder>
				{/*<Card.Section></Card.Section>*/}
				<Text fw={500}>Sign In</Text>
				<Text size="xs">Enter your email below to login to your account</Text>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						label="Email"
						placeholder="test@example.com"
						required
						name="email"
						autoComplete="email"
						key={form.key("email")}
						{...form.getInputProps("email")}
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						required
						name="password"
						autoComplete="current-password"
						mt="md"
						key={form.key("password")}
						{...form.getInputProps("password")}
					/>
					<Group mt="md" justify="space-between">
						<Checkbox
							label="Remember me"
							name="rememberMe"
							key={form.key("rememberMe")}
							{...form.getInputProps("rememberMe", { type: "checkbox" })}
						/>
						<Anchor size="sm" href="/forget-password">
							Forgot Password？
						</Anchor>
					</Group>
					<Button fullWidth mt="xl" type="submit">
						Sign In
					</Button>
				</form>
			</Card>
		</Container>
	);
}
