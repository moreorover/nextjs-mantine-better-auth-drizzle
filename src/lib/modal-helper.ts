import { ContextModalProps, modals } from "@mantine/modals";

import { Session } from "@/lib/auth-schema";

export type ModalNames =
  | "totpVerification"
  | "showBackupCodes"
  | "changePassword"
  | "enable2fa"
  | "editUser"
  | "showTwoFactorQrCode";

export const modalTitles: Record<ModalNames, string> = {
  totpVerification: "Verify TOTP",
  showBackupCodes: "Your Backup Codes",
  changePassword: "Change Password",
  enable2fa: "Enable 2FA",
  editUser: "Edit User",
  showTwoFactorQrCode: "Show Two Factor QrCode",
};

export interface ModalPropsMap {
  totpVerification: {
    onVerified: () => void;
  };
  showBackupCodes: object;
  changePassword: object;
  enable2fa: { session: Session };
  editUser: { fullName: string };
  showTwoFactorQrCode: object;
}

export type TypedContextModalProps<K extends ModalNames> = ContextModalProps<
  ModalPropsMap[K]
>;

export function openTypedContextModal<N extends ModalNames>(
  name: N,
  options: {
    title?: string;
    innerProps: ModalPropsMap[N];
  },
) {
  modals.openContextModal({
    modal: name,
    title: options.title ?? modalTitles[name],
    innerProps: options.innerProps,
  });
}
