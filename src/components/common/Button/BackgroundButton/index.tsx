import * as S from "./styles";

interface IBackgroundButton {
  isActivated?: boolean;
  backgroundColor?: "white" | "gray_5";
  handleTouch: () => void;
  children: React.ReactNode;
}
const BackgroundButton = ({
  isActivated,
  backgroundColor = "gray_5",
  handleTouch,
  children
}: IBackgroundButton) => {
  return (
    <S.Background $backgroundColor={backgroundColor}>
      <S.BackgroundButton $isActivated={isActivated} onClick={handleTouch} disabled={!isActivated}>
        {children}
      </S.BackgroundButton>
    </S.Background>
  );
};

export default BackgroundButton;
