import { type ButtonHTMLAttributes } from "react";

import { ActionButton, ButtonGroup, CloseButton } from "./styles";
import { useModal } from "../BottomSheet/BottomSheetContext";

export type TColorScheme = "primary" | "red";

export interface TicketInfo {
  actionText: string;
  closeText?: string;
  actionFn: (e: React.MouseEvent) => void | Promise<void>;
  closeFn?: (e: React.MouseEvent) => void | Promise<void>;
  colorScheme?: TColorScheme;
  shouldPropagate?: boolean;
}

export interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, TicketInfo {}

export const ModalButton = ({
  closeText,
  actionText,
  closeFn,
  actionFn,
  colorScheme = "primary",
  shouldPropagate = false,
  ...props
}: ModalButtonProps) => {
  const modal = useModal();

  const defaultCloseFn = closeFn ? closeFn : modal?.onClose;

  const handleActionClick = (e: React.MouseEvent) => {
    if (!shouldPropagate) {
      e.stopPropagation();
    }
    actionFn(e);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    if (!shouldPropagate) {
      e.stopPropagation();
    }
    defaultCloseFn(e);
  };

  return (
    <ButtonGroup>
      {closeText && (
        <CloseButton onClick={handleCloseClick} {...props}>
          {closeText}
        </CloseButton>
      )}
      <ActionButton colorScheme={colorScheme} onClick={handleActionClick} {...props}>
        {actionText}
      </ActionButton>
    </ButtonGroup>
  );
};
