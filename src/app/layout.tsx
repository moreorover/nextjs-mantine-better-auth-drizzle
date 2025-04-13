import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import "./globals.css";
import "@mantine/notifications/styles.css";
import { Header } from "@/components/header";
import { ChangePassword } from "@/components/profile/change-password";
import { EditUser } from "@/components/profile/edit-user";
import { Enable2Fa } from "@/components/profile/enable-2fa-modal";

import theme from "./theme";

export const metadata: Metadata = {
  title: "Prive Video",
  description: "Video Courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      {...mantineHtmlProps}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body className="antialiased">
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <ModalsProvider
            modals={{
              enable2fa: Enable2Fa,
              editUser: EditUser,
              changePassword: ChangePassword,
            }}
          >
            <Notifications />
            <Header />
            {children}
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
