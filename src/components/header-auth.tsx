"use client";

import { authClient } from "@/lib/auth-client";
import { Group, UnstyledButton, Text, Button, Menu } from "@mantine/core";
import cx from "clsx";
import classes from "@/components/header-auth.module.css";
import Link from "next/link";
import { Icon } from "@iconify/react";

export function HeaderAuth() {
  const session = authClient.useSession();
  const user = session.data?.user;

  return (
    <>
      {user && (
        <Menu>
          <Menu.Target>
            <UnstyledButton className={cx(classes.user)}>
              <Group gap={7}>
                {/*<Avatar src={user.image} alt={user.name} radius="xl" size={20} />*/}
                <Text fw={500} size="sm" lh={1} mr={3}>
                  {user.name}
                </Text>
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              component={Link}
              href={"/profile"}
              leftSection={
                <Icon icon={"lucide:settings"} width={16} height={16} />
              }
            >
              Account settings
            </Menu.Item>
            <Menu.Item
              leftSection={
                <Icon icon={"lucide:log-out"} width={16} height={16} />
              }
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
      {!user && (
        <Group visibleFrom="sm">
          <Button component={Link} variant="default" href={"/sign-in"}>
            Sign in
          </Button>
          <Button>Sign up</Button>
        </Group>
      )}
    </>
  );
}
