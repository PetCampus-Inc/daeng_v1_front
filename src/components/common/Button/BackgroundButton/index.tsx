import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import * as S from "./styles";

interface BackgroundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hasNav?: boolean; // nav bottom 위에 위치
  pb?: number; // button padding-bottom
  backgroundColor?: "white" | "gray_5" | "primaryColor" | "transparent";
  buttonBackgroundColor?: "gray_4" | "primaryColor";
  fontColor?: "gray_3" | "white";
}

export const BackgroundButton = ({
  hasNav,
  backgroundColor = "gray_5",
  buttonBackgroundColor = "primaryColor",
  fontColor = "white",
  pb = 32,
  children,
  ...props
}: PropsWithChildren<BackgroundButtonProps>) => {
  return (
    <S.BackgroundButtonWrapper hasNav={hasNav}>
      <S.Background bg={backgroundColor} pb={pb} className={props.className}>
        <S.Button bg={buttonBackgroundColor} fontColor={fontColor} {...props}>
          {children}
        </S.Button>
      </S.Background>
    </S.BackgroundButtonWrapper>
  );
};
