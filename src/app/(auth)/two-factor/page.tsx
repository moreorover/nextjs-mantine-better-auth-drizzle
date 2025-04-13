"use client";

import { Button, Card, Container, PinInput, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";
import { redirect } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { twoFactorSchema } from "@/lib/auth-schema";

export default function Page() {
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
        trustDevice: true,
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
        <Stack>
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
        </Stack>
      </Card>
    </Container>
  );
}
