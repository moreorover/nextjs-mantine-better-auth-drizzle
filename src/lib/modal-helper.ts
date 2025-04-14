import { modals } from "@mantine/modals";

export type ModalNames = "totpVerification" | "showBackupCodes";

export const modalTitles: Record<ModalNames, string> = {
  totpVerification: "Verify TOTP",
  showBackupCodes: "Your Backup Codes",
};

export interface ModalPropsMap {
  totpVerification: {
    onVerified: () => void;
  };
  showBackupCodes: object;
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
