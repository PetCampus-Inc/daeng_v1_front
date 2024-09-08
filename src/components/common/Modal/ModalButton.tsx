import { type ButtonHTMLAttributes } from "react";

import { ActionButton, ButtonGroup, CloseButton } from "./styles";
import { useModal } from "../BottomSheet/BottomSheetContext";

export type ColorKeysScheme = "primary" | "red";

export interface ModalButtonProps {
  actionText: string;
  closeText?: string;
  actionFn: () => void | Promise<void>;
  closeFn?: () => void | Promise<void>;
  colorScheme?: ColorKeysScheme;
}

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, ModalButtonProps {}

export const ModalButton = ({
  closeText,
  actionText,
  closeFn,
  actionFn,
  colorScheme = "primary",
  ...props
}: Props) => {
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
