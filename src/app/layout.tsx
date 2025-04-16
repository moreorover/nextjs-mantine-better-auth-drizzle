import { ChangePassword } from "@/components/profile/change-password";
import { EditUser } from "@/components/profile/edit-user";
import { Enable2Fa } from "@/components/profile/enable-2fa-modal";
import { GenerateBackupCodes } from "@/components/profile/generate-backup-codes-modal";
import { ShowTwoFactorQrCode } from "@/components/profile/show-2fa-modal";
import { ShowBackupCodes } from "@/components/profile/show-backup-codes";
import { TotpVerification } from "@/components/profile/totp-verification";
import {
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import "@/app/globals.css";
import theme from "@/app/theme";
import "@mantine/notifications/styles.css";
import { BanUser } from "@/components/profile/ban-user-modal";
import { CreateUser } from "@/components/profile/create-user-modal";
import { TRPCReactProvider } from "@/trpc/react";

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
				<TRPCReactProvider>
					<MantineProvider defaultColorScheme="dark" theme={theme}>
						<ModalsProvider
							modals={{
								enable2fa: Enable2Fa,
								editUser: EditUser,
								changePassword: ChangePassword,
								showTwoFactorQrCode: ShowTwoFactorQrCode,
								showBackupCodes: ShowBackupCodes,
								totpVerification: TotpVerification,
								generateBackupCodes: GenerateBackupCodes,
								createUser: CreateUser,
								banUser: BanUser,
							}}
						>
							<Notifications />
							{/*<Header />*/}
							{children}
						</ModalsProvider>
					</MantineProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
