"use client";

import {
  Button,
  Container,
  Loader,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import QRCode from "react-qr-code";

import { authClient } from "@/lib/auth-client";
import { Session } from "@/lib/auth-schema";


export const Enable2Fa = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  session: Session;
}>) => {
  const [isPendingTwoFa, setIsPendingTwoFa] = useState<boolean>(false);
  const [twoFaPassword, setTwoFaPassword] = useState<string>("");
  const [twoFactorVerifyURI, setTwoFactorVerifyURI] = useState<string>("");

  return (
    <Container>
      <Stack gap="sm">
        <Text size="sm">
          {innerProps.session.user.twoFactorEnabled
            ? "Disable the second factor authentication from your account"
            : "Enable 2FA to secure your account"}
        </Text>
        {twoFactorVerifyURI ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center">
              <QRCode value={twoFactorVerifyURI} />
            </div>
            <TextInput
              label="Scan the QR code with your TOTP app"
              value={twoFaPassword}
              onChange={(e) => setTwoFaPassword(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <PasswordInput
              label="Password"
              id="password"
              placeholder="Password"
              autoComplete="current-password"
              value={twoFaPassword}
              onChange={(e) => setTwoFaPassword(e.target.value)}
            />
          </div>
        )}
        <Button
          disabled={isPendingTwoFa}
          onClick={async () => {
            if (twoFaPassword.length < 8 && !twoFactorVerifyURI) {
              notifications.show({
                color: "red",
                title: "Failed",
                message: "Password must be at least 8 characters",
              });
              return;
            }
            setIsPendingTwoFa(true);
            if (innerProps.session.user.twoFactorEnabled) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const res = await authClient.twoFactor.disable({
                password: twoFaPassword,
                fetchOptions: {
                  onError(context) {
                    notifications.show({
                      color: "red",
                      title: "Failed",
                      message: context.error.message,
                    });
                  },
                  onSuccess() {
                    notifications.show({
                      color: "green",
                      title: "Success",
                      message: "2FA enabled successfully",
                    });
                    context.closeModal(id);
                  },
                },
              });
            } else {
              if (twoFactorVerifyURI) {
                await authClient.twoFactor.verifyTotp({
                  code: twoFaPassword,
                  fetchOptions: {
                    onError(context) {
                      setIsPendingTwoFa(false);
                      setTwoFaPassword("");
                      notifications.show({
                        color: "red",
                        title: "Failed",
                        message: context.error.message,
                      });
                    },
                    onSuccess() {
                      notifications.show({
                        color: "green",
                        title: "Success",
                        message: "2FA enabled successfully",
                      });
                      setTwoFactorVerifyURI("");
                      setIsPendingTwoFa(false);
                      setTwoFaPassword("");
                      context.closeModal(id);
                    },
                  },
                });
                return;
              }
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const res = await authClient.twoFactor.enable({
                password: twoFaPassword,
                fetchOptions: {
                  onError(context) {
                    notifications.show({
                      color: "red",
                      title: "Failed",
                      message: context.error.message,
                    });
                  },
                  onSuccess(ctx) {
                    setTwoFactorVerifyURI(ctx.data.totpURI);
                    notifications.show({
                      color: "green",
                      title: "Success",
                      message: "2FA enabled successfully",
                    });
                    // setTwoFactorDialog(false);
                    // context.closeModal(id);
                  },
                },
              });
            }
            setIsPendingTwoFa(false);
            setTwoFaPassword("");
          }}
        >
          {isPendingTwoFa ? (
            <Loader size={15} className="animate-spin" />
          ) : innerProps.session.user.twoFactorEnabled ? (
            "Disable 2FA"
          ) : (
            "Enable 2FA"
          )}
        </Button>
        <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
          Close modal
        </Button>
      </Stack>
    </Container>
  );
};
