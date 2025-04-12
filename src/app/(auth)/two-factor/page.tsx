"use client";

import { Button, Card, Container, PinInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { twoFactorSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { notifications } from "@mantine/notifications";

export default function Page() {
  console.log("xxxxxxxxxxxxxxxxx");
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      totp: "",
    },
    validate: zodResolver(twoFactorSchema),
  });

  async function handleSubmit(values: typeof form.values) {
    const { totp } = values;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await authClient.twoFactor.verifyTotp(
      {
        code: totp,
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
            message: "Please make sure TOTP code is correct.",
          });
        },
      },
    );
  }
  return (
    <Container size="xs">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500}>TOTP Verification</Text>
        <Text size="xs">Enter your 6-digit TOTP code to authenticate</Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <PinInput
            oneTimeCode
            type="number"
            length={6}
            key={form.key("totp")}
            {...form.getInputProps("totp")}
          />
          <Button fullWidth mt="xl" type="submit">
            Verify
          </Button>
        </form>
      </Card>
    </Container>
  );
}
