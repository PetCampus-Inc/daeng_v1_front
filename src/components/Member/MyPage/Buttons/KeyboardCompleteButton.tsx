import * as S from "./styles";

const KeyboardCompleteButton = ({
  handleBlur,
  isFocusing
}: {
  handleBlur: () => void;
  isFocusing: boolean;
}) => {
  return (
    <>
      {isFocusing && <S.KeyboardCompleteButton onClick={handleBlur}>완료</S.KeyboardCompleteButton>}
    </>
  );
};

export default KeyboardCompleteButton;
