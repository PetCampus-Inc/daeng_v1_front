import { memo } from "react";
import { InputBoxWrapper, InputBox } from "./styles";

const Index = () => {
  return (
    <>
      <InputBoxWrapper>
        <InputBox placeholder="아이디" string="white" />
        <InputBox placeholder="비밀번호" string="black" />
      </InputBoxWrapper>
      <button>로그인</button>
    </>
  );
};

export default memo(Index);
