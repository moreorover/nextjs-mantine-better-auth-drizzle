"use client";

import { Session } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  Button,
  Card,
  Container,
  Group,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { UAParser } from "ua-parser-js";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { Icon } from "@iconify/react";

interface Props {
  session: Session | null;
  activeSessions: Session["session"][];
}

export default function UserCard(props: Props) {
  const [isTerminating, setIsTerminating] = useState<string>();
  const router = useRouter();
  const { data } = authClient.useSession();
  const session = data || props.session;
  return (
    <Container size={"xs"} py={12}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="sm">
          <Text fw={500}>User</Text>
          <Group gap="sm" justify="space-between">
            <Group gap="sm">
              <Avatar name={session?.user.name} color={"initials"} />
              <div>
                <Text fz="sm" fw={500}>
                  {session?.user.name}
                </Text>
                <Text fz="xs" c="dimmed">
                  {session?.user.email}
                </Text>
              </div>
            </Group>
            <Button disabled>Edit</Button>
          </Group>

          <Text size="xs">Sessions</Text>

          {props.activeSessions
            .filter((s) => s.userAgent)
            .map((s) => {
              const parser = new UAParser(s.userAgent || "");
              const deviceType = parser.getDevice().type;
              const osName = parser.getOS().name;
              const browserName = parser.getBrowser().name;

              return (
                <Group key={s.id}>
                  {deviceType === "mobile" ? (
                    <Icon icon="lucide:smartphone" width={16} height={16} />
                  ) : (
                    <Icon icon="lucide:laptop" width={16} height={16} />
                  )}
                  <Text size="sm">
                    {osName}, {browserName}
                  </Text>
                  <Button
                    size="xs"
                    variant="subtle"
                    color="red"
                    onClick={async () => {
                      setIsTerminating(s.id);
                      const res = await authClient.revokeSession({
                        token: s.token,
                      });

                      if (res.error) {
                        notifications.show({
                          color: "red",
                          title: "Failed",
                          message: res.error.message,
                        });
                      } else {
                        notifications.show({
                          color: "emerald",
                          title: "Success",
                          message: "Session terminated successfully",
                        });
                      }

                      router.refresh();
                      setIsTerminating(undefined);
                    }}
                  >
                    {isTerminating === s.id ? (
                      <Loader size={14} />
                    ) : s.id === session?.session.id ? (
                      "Sign Out"
                    ) : (
                      "Terminate"
                    )}
                  </Button>
                </Group>
              );
            })}
        </Stack>
      </Card>
    </Container>
  );
}
