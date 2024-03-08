import { useContext, type ButtonHTMLAttributes } from "react";

import { ModalContext } from "./provider";
import { ButtonGroup, CloseButton } from "./styles";
import { ActionButton } from "../BottomSheet/styles";

export interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  actionText: string;
  closeText?: string;
  actionFn: () => void | Promise<void>;
  closeFn?: () => void | Promise<void>;
}

const ModalButton = ({ closeText, actionText, closeFn, actionFn, ...props }: ModalButtonProps) => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) throw new Error("ModalButton must be rendered within a Modal");

  const defaultCloseFn = closeFn ? closeFn : modalContext?.onClose;

  return (
    <ButtonGroup>
      {closeText && (
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

export default ModalButton;
