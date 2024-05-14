import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import * as S from "./styles";

interface IBackgroundButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: "white" | "gray_5" | "primaryColor";
  buttonBackgroundColor?: "gray_4" | "primaryColor";
}

const BackgroundButton = ({
  backgroundColor = "gray_5",
  buttonBackgroundColor = "primaryColor",
  children,
  ...props
}: PropsWithChildren<IBackgroundButton>) => {
  return (
    <S.Background $backgroundColor={backgroundColor} className={props.className}>
      <S.BackgroundButton $buttonBackgroundColor={buttonBackgroundColor} {...props}>
        {children}
      </S.BackgroundButton>
    </S.Background>
  );
};

export default BackgroundButton;
