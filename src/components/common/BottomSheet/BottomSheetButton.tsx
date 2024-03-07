import { type ButtonHTMLAttributes, useContext } from "react";

import { BottomSheetContext } from "./provider";
import { ActionButton, ButtonGroup, CloseButton } from "./styles";
export interface BottomSheetButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  actionText: string;
  closeText?: string;
  actionFn: () => void | Promise<void>;
  closeFn?: () => void | Promise<void>;
}

const BottomSheetButton = ({
  closeText,
  actionText,
  closeFn,
  actionFn,
  ...props
}: BottomSheetButtonProps) => {
  const bottomSheetContext = useContext(BottomSheetContext);

  if (!bottomSheetContext)
    throw new Error("BottomSheet.Control must be rendered within a BottomSheet");

  const defaultCloseFn = closeFn ? closeFn : bottomSheetContext?.onClose;

  return (
    <ButtonGroup>
      {closeText && closeFn && (
        <CloseButton onClick={defaultCloseFn} {...props}>
          {closeText}
        </CloseButton>
      )}
      <ActionButton onClick={actionFn} {...props}>
        {actionText}
      </ActionButton>
    </ButtonGroup>
  );
};

export default BottomSheetButton;
