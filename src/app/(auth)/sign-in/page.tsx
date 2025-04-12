"use client";

import { Container, Tabs } from "@mantine/core";
import SignIn from "@/components/sign-in";
import SignUp from "@/components/sign-up";

export default function Page() {
  return (
    <Container size="xs">
      <Tabs defaultValue="sign-in">
        <Tabs.List>
          <Tabs.Tab value="sign-in">Sign In</Tabs.Tab>
          <Tabs.Tab value="sign-up">Sign Up</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="sign-in">
          <SignIn />
        </Tabs.Panel>

        <Tabs.Panel value="sign-up">
          <SignUp />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
