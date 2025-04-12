"use client";

import {
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "@/components/header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const links = [
  { link: "/about", label: "About" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const pathname = usePathname();
  const session = authClient.useSession();

  console.log(session?.data?.user);

  const logo = <Button>Logo</Button>;

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={pathname === link.link || undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {logo}

        {/* Desktop nav */}
        <Group gap={5} visibleFrom="sm">
          {...items}
        </Group>

        <Group visibleFrom="sm">
          <Button component={Link} variant="default" href={"/sign-in"}>
            Sign in
          </Button>
          <Button>Sign up</Button>
        </Group>

        {/* Burger button for mobile */}
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        <Drawer.Root
          opened={opened}
          onClose={toggle}
          size="100%"
          padding="md"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{logo}</Drawer.Title>
              <Drawer.CloseButton />
            </Drawer.Header>
            <Drawer.Body>
              <ScrollArea h="calc(100vh - 80px" mx="-md">
                <Stack justify="space-between">
                  <Divider my="sm" />
                  <>{...items}</>
                  <Divider my="sm" />
                  <Group justify="center" grow pb="xl" px="md">
                    <Button variant="default">Log in</Button>
                    <Button>Sign up</Button>
                  </Group>
                </Stack>
              </ScrollArea>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      </Container>
    </header>
  );
}
