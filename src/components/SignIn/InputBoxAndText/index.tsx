import { memo, SetStateAction, ChangeEvent } from "react";
import { StyledMainWrapper, StyledMainText } from "./styles";
import InputBox from "components/common/InputBox";

interface Props {
  text: string;
  type: string;
  inputValue: any;
  setInputValue: (e: any) => void | SetStateAction<any>;
}

const InputBoxAndText = ({ text, type, inputValue, setInputValue }: Props) => {
  return (
    <StyledMainWrapper>
      <StyledMainText>{text}</StyledMainText>
      <InputBox
        height="100%"
        width="100%"
        placeholdText={"아이디를 입력해주세요"}
        type={type}
        inputValue={inputValue}
        setInputValue={(e: ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
      />
    </StyledMainWrapper>
  );
};

export default memo(InputBoxAndText);
