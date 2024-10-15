import { type ButtonHTMLAttributes, useContext } from "react";

import { BottomSheetContext } from "./BottomSheetContext";
import { ButtonGroup } from "./styles";
import { WideButton } from "../Button";
export interface BottomSheetButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  actionText: string;
  closeText?: string;
  actionFn: () => void | Promise<void>;
  closeFn?: () => void | Promise<void>;
}

export const BottomSheetButton = ({
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
        <WideButton colorScheme="gray_3" onClick={defaultCloseFn} {...props}>
          {closeText}
        </WideButton>
      )}
      <WideButton onClick={actionFn} {...props}>
        {actionText}
      </WideButton>
    </ButtonGroup>
  );
};
