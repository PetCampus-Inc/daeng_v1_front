import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import * as S from "./styles";

interface IBackgroundButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  hasNav?: boolean; // nav bottom 위에 위치
  pb?: number; // button padding-bottom
  backgroundColor?: "white" | "gray_5" | "primaryColor" | "transparent";
  buttonBackgroundColor?: "gray_4" | "primaryColor";
}

const BackgroundButton = ({
  hasNav,
  backgroundColor = "gray_5",
  buttonBackgroundColor = "primaryColor",
  pb = 42,
  children,
  ...props
}: PropsWithChildren<IBackgroundButton>) => {
  return (
    <S.BackgroundButtonWrapper hasNav={hasNav}>
      <S.Background bg={backgroundColor} pb={pb} className={props.className}>
        <S.Button bg={buttonBackgroundColor} {...props}>
          {children}
        </S.Button>
      </S.Background>
    </S.BackgroundButtonWrapper>
  );
};

export default BackgroundButton;
