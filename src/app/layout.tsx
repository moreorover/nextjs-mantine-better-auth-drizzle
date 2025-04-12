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
          <Notifications />
          <Header />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
