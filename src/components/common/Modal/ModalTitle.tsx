import { type ReactNode } from "react";

import { MainText, SubText, TextWrapper } from "./styles";

export interface ModalTitleProps {
  title: string;
  subtitle: string | ReactNode;
}

export const ModalTitle = ({ title, subtitle }: ModalTitleProps) => {
  return (
    <TextWrapper>
      <MainText>{title}</MainText>
      <SubText>{subtitle}</SubText>
    </TextWrapper>
  );
};
