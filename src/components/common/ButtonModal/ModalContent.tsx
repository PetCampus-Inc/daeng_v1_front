import { PropsWithChildren, useContext } from "react";

import { ModalContext } from "./provider";
import { StyledContent } from "./styles";
import { ModalButtonVariant } from "./type";

type ModalContentProps = {
  variant?: ModalButtonVariant;
};

const ModalContent = ({ children, variant = "one" }: PropsWithChildren<ModalContentProps>) => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) throw new Error("Modal.Content must be rendered within a Modal.Root.");

  return <StyledContent variant={variant}>{children}</StyledContent>;
};

export default ModalContent;
