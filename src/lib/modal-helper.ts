import { modals } from "@mantine/modals";
import { Session } from "@/lib/auth-schema";

export type ModalNames =
  | "totpVerification"
  | "showBackupCodes"
  | "changePassword"
  | "enable2fa";

export const modalTitles: Record<ModalNames, string> = {
  totpVerification: "Verify TOTP",
  showBackupCodes: "Your Backup Codes",
  changePassword: "Change Password",
  enable2fa: "Enable 2FA",
};

export interface ModalPropsMap {
  totpVerification: {
    onVerified: () => void;
  };
  showBackupCodes: object;
  changePassword: object;
  enable2fa: { session: Session | null };
}

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
