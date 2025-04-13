"use client";

import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HeaderAuth } from "@/components/header-auth";
import classes from "@/components/header.module.css";

const links = [
  { link: "/about", label: "About" },
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

  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {logo}

        {/* Desktop nav */}
        <Group gap={5} visibleFrom="sm">
          {...items}
        </Group>

        <Group gap={5} visibleFrom="sm">
          <HeaderAuth />
          <ActionIcon
            variant="default"
            size="sm"
            onClick={toggleColorScheme}
            title="Toggle color scheme"
          >
            {colorScheme === "light" ? (
              <Icon icon={"lucide:sun"} width={14} height={14} />
            ) : (
              <Icon icon={"lucide:moon"} width={14} height={14} />
            )}
          </ActionIcon>
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
                  <HeaderAuth />
                  <ActionIcon
                    variant="default"
                    size="sm"
                    onClick={toggleColorScheme}
                    title="Toggle color scheme"
                  >
                    {colorScheme === "light" ? (
                      <Icon icon={"lucide:sun"} width={14} height={14} />
                    ) : (
                      <Icon icon={"lucide:moon"} width={14} height={14} />
                    )}
                  </ActionIcon>
                </Stack>
              </ScrollArea>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      </Container>
    </header>
  );
}
