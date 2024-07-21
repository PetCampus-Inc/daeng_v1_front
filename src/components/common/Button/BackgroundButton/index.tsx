import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import * as S from "./styles";

interface BackgroundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pb?: number; // button padding-bottom
  backgroundColor?: "white" | "gray_5" | "primaryColor" | "transparent";
  buttonBackgroundColor?: "gray_4" | "primaryColor";
}

export const BackgroundButton = ({
  backgroundColor = "gray_5",
  buttonBackgroundColor = "primaryColor",
  pb = 32,
  children,
  ...props
}: PropsWithChildren<BackgroundButtonProps>) => {
  return (
    <S.BackgroundButtonWrapper>
      <S.Background bg={backgroundColor} pb={pb} className={props.className}>
        <S.Button bg={buttonBackgroundColor} {...props}>
          {children}
        </S.Button>
      </S.Background>
    </S.BackgroundButtonWrapper>
  );
};
