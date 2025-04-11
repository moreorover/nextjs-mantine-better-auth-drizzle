"use client";

import { Burger, Button, Container, Drawer, Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "@/components/header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const pathname = usePathname();

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
        <Group gap={5} visibleFrom="xs">
          {...items}
        </Group>

        {/* Burger button for mobile */}
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

        <Drawer.Root
          opened={opened}
          onClose={toggle}
          size="100%"
          padding="md"
          hiddenFrom="xs"
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{logo}</Drawer.Title>
              <Drawer.CloseButton />
            </Drawer.Header>
            <Drawer.Body>
              <Stack>{...items}</Stack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      </Container>
    </header>
  );
}
