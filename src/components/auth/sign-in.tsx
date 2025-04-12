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
import { zodResolver } from "mantine-form-zod-resolver";
import { signInSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { notifications } from "@mantine/notifications";
import { redirect } from "next/navigation";

export default function SignIn() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: process.env.NODE_ENV === "development" ? "x@x.com" : "",
      password: process.env.NODE_ENV === "development" ? "password123" : "",
      rememberMe: true,
    },
    validate: zodResolver(signInSchema),
  });

  async function handleSubmit(values: typeof form.values) {
    console.log({ values });
    const { email, password, rememberMe } = values;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        rememberMe,
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
          redirect("/profile");
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
              {...form.getInputProps("rememberMe")}
            />
            <Anchor size="sm" href="#">
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
