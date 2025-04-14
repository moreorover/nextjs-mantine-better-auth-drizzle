import { modals } from "@mantine/modals";

export type ModalNames = "totpVerification" | "showBackupCodes";

export interface ModalPropsMap {
  totpVerification: {
    onVerified?: () => void;
  };
  showBackupCodes: object;
}

export function openTypedContextModal<N extends ModalNames>(
  name: N,
  options: {
    title: string;
    innerProps: ModalPropsMap[N];
  },
) {
  modals.openContextModal({
    modal: name,
    title: options.title,
    innerProps: options.innerProps,
  });
}
