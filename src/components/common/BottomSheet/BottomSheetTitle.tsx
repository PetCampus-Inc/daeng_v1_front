import { PropsWithChildren } from "react";

import { SubTitle, Title } from "./styles";

interface TitleProps {
  position?: "left" | "right" | "center";
}

export const BottomSheetTitle = ({
  position = "center",
  children
}: PropsWithChildren<TitleProps>) => {
  return <Title className={`bottom-sheet-title ${position}`}>{children}</Title>;
};

export const BottomSheetSubTitle = ({
  position = "center",
  children
}: PropsWithChildren<TitleProps>) => {
  return <SubTitle className={`bottom-sheet-subtitle ${position}`}>{children}</SubTitle>;
};
