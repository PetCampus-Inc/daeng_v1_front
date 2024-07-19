import { type PropsWithChildren } from "react";

import { StyledContent } from "./styles";

export type ModalContentVariant = "one-button" | "two-button";

type ModalContentProps = {
  variant?: ModalContentVariant;
};

export const ModalContent = ({
  children,
  variant = "one-button"
}: PropsWithChildren<ModalContentProps>) => {
  return <StyledContent variant={variant}>{children}</StyledContent>;
};
