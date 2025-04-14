import { ContextModalProps } from "@mantine/modals";

export type ModalNames = "totpVerification" | "finalConfirmation";

export interface ModalPropsMap {
  totpVerification: {
    onVerified: () => void;
  };
  finalConfirmation: {
    userId: string;
  };
}

export type TypedContextModalProps<K extends ModalNames> = ContextModalProps<
  ModalPropsMap[K]
>;
