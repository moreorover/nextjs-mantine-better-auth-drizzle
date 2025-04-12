import type { Metadata } from "next";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import theme from "./theme";
import "./globals.css";
import "@mantine/notifications/styles.css";
import { Header } from "@/components/header";
import { ModalsProvider } from "@mantine/modals";
import { Enable2Fa } from "@/components/profile/enable-2fa-modal";
import { EditUser } from "@/components/profile/edit-user";

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
          <ModalsProvider modals={{ enable2fa: Enable2Fa, editUser: EditUser }}>
            <Notifications />
            <Header />
            {children}
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
