import { memo } from "react";
import { StyledMainWrapper, StyledMainText } from "./styles";
import InputBox from "components/common/InputBox";

interface Props {
  text: string;
}

const InputBoxAndText = ({ text }: Props) => {
  return (
    <StyledMainWrapper>
      <StyledMainText>{text}</StyledMainText>
      <InputBox
        height="100%"
        width="100%"
        placeholdText={"아이디를 입력해주세요"}
      />
    </StyledMainWrapper>
  );
};

export default memo(InputBoxAndText);
