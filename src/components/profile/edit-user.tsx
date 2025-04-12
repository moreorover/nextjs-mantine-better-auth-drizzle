"use client";

import { ContextModalProps } from "@mantine/modals";
import { Button, Container, Stack, Text, TextInput } from "@mantine/core";
import { authClient } from "@/lib/auth-client";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useState } from "react";

export const EditUser = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  fullName: string;
}>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fullName: "",
    },
    validate: zodResolver(
      z.object({ fullName: z.string().min(1, "Full name is required.") }),
    ),
  });

  async function handleSubmit(values: typeof form.values) {
    const { fullName } = values;
    setIsLoading(true);
    await authClient.updateUser({
      name: fullName,
      fetchOptions: {
        onSuccess: () => {
          notifications.show({
            color: "green",
            title: "Success",
            message: "Name updated",
          });
          context.closeModal(id);
        },
        onError: (error) => {
          notifications.show({
            color: "red",
            title: "Error",
            message: error.error.message,
          });
        },
      },
    });
    setIsLoading(false);
  }

  return (
    <Container>
      <Stack gap="sm">
        <Text size="xs">Edit user information</Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Full Name"
            placeholder={innerProps.fullName}
            required
            name="fullName"
            key={form.key("fullName")}
            {...form.getInputProps("fullName")}
          />
          <Button disabled={isLoading} fullWidth mt="xl" type="submit">
            Update
          </Button>
        </form>
        <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
          Cancel
        </Button>
      </Stack>
    </Container>
  );
};
