import * as S from "./styles";

interface IProps {
  handleBlur: () => void;
  isFocusing: boolean;
}

const KeyboardCompleteButton = ({ handleBlur, isFocusing }: IProps) => {
  return (
    <>
      {isFocusing && <S.KeyboardCompleteButton onClick={handleBlur}>완료</S.KeyboardCompleteButton>}
    </>
  );
};

export default KeyboardCompleteButton;
