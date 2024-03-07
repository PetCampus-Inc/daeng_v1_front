import { PropsWithChildren } from "react";

import { SubTitle, Title } from "./styles";

export interface TitleProps {
  align?: "left" | "right" | "center";
  variant?: "title" | "body";
}

type SubTitleProps = Pick<TitleProps, "align">;

export const BottomSheetTitle = ({
  align = "center",
  variant = "title",
  children
}: PropsWithChildren<TitleProps>) => {
  return (
    <Title className={`bottom-sheet-title ${align}`} variant={variant}>
      {children}
    </Title>
  );
};

export const BottomSheetSubTitle = ({
  align = "center",
  children
}: PropsWithChildren<SubTitleProps>) => {
  return <SubTitle className={`bottom-sheet-subtitle ${align}`}>{children}</SubTitle>;
};
