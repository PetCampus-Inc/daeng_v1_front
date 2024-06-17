import { type ButtonHTMLAttributes } from "react";

import { ActionButton, ButtonGroup, CloseButton } from "./styles";
import { useModal } from "../BottomSheet/BottomSheetContext";

export type TColorScheme = "primary" | "red";

export interface TicketInfo {
  actionText: string;
  closeText?: string;
  actionFn: () => void | Promise<void>;
  closeFn?: () => void | Promise<void>;
  colorScheme?: TColorScheme;
}

export interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, TicketInfo {}

export const ModalButton = ({
  closeText,
  actionText,
  closeFn,
  actionFn,
  colorScheme = "primary",
  ...props
}: ModalButtonProps) => {
  const modal = useModal();

  const defaultCloseFn = closeFn ? closeFn : modal?.onClose;

  return (
    <ButtonGroup>
      {closeText && (
        <CloseButton onClick={defaultCloseFn} {...props}>
          {closeText}
        </CloseButton>
      )}
      <ActionButton colorScheme={colorScheme} onClick={actionFn} {...props}>
        {actionText}
      </ActionButton>
    </ButtonGroup>
  );
};
