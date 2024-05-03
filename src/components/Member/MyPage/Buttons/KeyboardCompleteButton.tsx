import { IMemberInfoEdite } from "types/Member.type";

import * as S from "./styles";

const KeyboardCompleteButton = ({ handleBlur, isFocusing }: IMemberInfoEdite) => {
  return (
    <>
      {isFocusing && <S.KeyboardCompleteButton onClick={handleBlur}>완료</S.KeyboardCompleteButton>}
    </>
  );
};

export default KeyboardCompleteButton;
