import {
	Button,
	Card,
	Container,
	PasswordInput,
	Text,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";

import { authClient } from "@/lib/auth-client";
import { signUpSchema } from "@/lib/auth-schema";

export default function SignUp() {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},

		validate: zodResolver(signUpSchema),
	});

	async function handleSubmit(values: typeof form.values) {
		const { firstName, lastName, email, password } = values;
		await authClient.signUp.email(
			{
				name: `${firstName} ${lastName}`,
				email,
				password,
				callbackURL: "/features",
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

				onError: (ctx) => {
					console.log(ctx);
					notifications.show({
						color: "red",
						title: "Sign Up Failed",
						message: "Please make sure your email and password is correct.",
					});
				},
			},
		);
	}

	return (
		<Container py={12}>
			<Card shadow="sm" padding="lg" radius="md" withBorder>
				<Text fw={500}>Sign Up</Text>
				<Text size="xs">Enter your information to create an account</Text>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						label="First Name"
						placeholder="Joane"
						required
						name="firstName"
						autoComplete="given-name"
						key={form.key("firstName")}
						{...form.getInputProps("firstName")}
					/>
					<TextInput
						label="Last Name"
						placeholder="Jones"
						required
						name="lastName"
						autoComplete="family-name"
						key={form.key("lastName")}
						{...form.getInputProps("lastName")}
					/>
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
						placeholder="Password"
						required
						name="password"
						autoComplete="new-password"
						mt="md"
						key={form.key("password")}
						{...form.getInputProps("password")}
					/>
					<PasswordInput
						label="Confirm Password"
						placeholder="Confirm Password"
						required
						name="confirmPassword"
						autoComplete="new-password"
						mt="md"
						key={form.key("confirmPassword")}
						{...form.getInputProps("confirmPassword")}
					/>
					<Button fullWidth mt="xl" type="submit">
						Sign Up
					</Button>
				</form>
			</Card>
		</Container>
	);
}
