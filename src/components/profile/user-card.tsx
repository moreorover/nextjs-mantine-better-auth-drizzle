"use client";

import { Session } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
} from "@mantine/core";

interface Props {
  session: Session | null;
  activeSessions: Session["session"][];
}

export default function UserCard(props: Props) {
  const { data, isPending } = authClient.useSession();
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
        </Stack>
      </Card>
    </Container>
  );
}
