import * as S from "./styles";

interface IBackgroundButton {
  isActivated?: boolean;
  backgroundColor?: "white" | "gray_5";
  handleTouch: () => void;
}
const BackgroundButton = ({
  isActivated,
  backgroundColor = "gray_5",
  handleTouch
}: IBackgroundButton) => {
  return (
    <S.Background $backgroundColor={backgroundColor}>
      <S.BackgroundButton $isActivated={isActivated} onClick={handleTouch}>
        삭제
      </S.BackgroundButton>
    </S.Background>
  );
};

export default BackgroundButton;
