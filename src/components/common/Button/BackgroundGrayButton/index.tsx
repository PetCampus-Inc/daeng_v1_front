import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import * as S from "./styles";

interface IBackgroundButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: "white" | "gray_5";
}
const BackgroundGrayButton = ({
  backgroundColor = "gray_5",
  children,
  ...props
}: PropsWithChildren<IBackgroundButton>) => {
  return (
    <S.Background $backgroundColor={backgroundColor} className={props.className}>
      <S.BackgroundButton {...props}>{children}</S.BackgroundButton>
    </S.Background>
  );
};

export default BackgroundGrayButton;
