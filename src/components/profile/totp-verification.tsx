"use client";

import { Button, Container, Stack, Text, TextInput } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

export const TotpVerification = ({ context, id }: ContextModalProps) => {
  const [isPendingTwoFa, setIsPendingTwoFa] = useState<boolean>(false);
  const [twoFaPassword, setTwoFaPassword] = useState<string>("");

  return (
    <Container>
      <Stack gap="sm">
        <Text size="sm">Enter your 6-digit TOTP code to verify</Text>

        <TextInput
          label="TOTP code"
          value={twoFaPassword}
          onChange={(e) => setTwoFaPassword(e.target.value)}
          placeholder="Enter TOTP"
        />
        <Button
          loading={isPendingTwoFa}
          disabled={isPendingTwoFa}
          onClick={async () => {
            await authClient.twoFactor.verifyTotp({
              code: twoFaPassword,
              trustDevice: true,
              fetchOptions: {
                onError() {
                  setIsPendingTwoFa(false);
                  setTwoFaPassword("");
                  notifications.show({
                    color: "red",
                    title: "Failed",
                    message: "Invalid TOTP code",
                  });
                },
                onSuccess() {
                  notifications.show({
                    color: "green",
                    title: "Success",
                    message: "TOTP Verified",
                  });
                  setIsPendingTwoFa(false);
                  setTwoFaPassword("");
                  context.closeModal(id);
                  context.openContextModal("showBackupCodes", {
                    title: "Show Backup Codes",
                    innerProps: {},
                  });
                },
              },
            });
            setIsPendingTwoFa(false);
            setTwoFaPassword("");
          }}
        >
          Verify
        </Button>
        <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
          Cancel
        </Button>
      </Stack>
    </Container>
  );
};
