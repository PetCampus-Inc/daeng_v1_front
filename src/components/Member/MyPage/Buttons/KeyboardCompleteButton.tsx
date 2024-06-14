import * as S from "./styles";

import type { IMemberInfoEdite } from "types/member/member.types";

const KeyboardCompleteButton = ({ handleBlur, isFocusing }: IMemberInfoEdite) => {
  return (
    <>
      {isFocusing && <S.KeyboardCompleteButton onClick={handleBlur}>완료</S.KeyboardCompleteButton>}
    </>
  );
};

export default KeyboardCompleteButton;
