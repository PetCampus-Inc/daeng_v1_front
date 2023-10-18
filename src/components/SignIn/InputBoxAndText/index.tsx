import { memo, SetStateAction, ChangeEvent } from "react";
import { StyledMainWrapper, StyledMainText } from "./styles";
import InputBox from "components/common/InputBox";

interface Props {
  text: string;
  type: string;
  className?: string;
  inputValue: any;
  placeholder?: string;
  setInputValue: (e: any) => void | SetStateAction<any>;
  handleClick?: () => void | Promise<void>;
}

const InputBoxAndText = ({
  text,
  type,
  className,
  inputValue,
  placeholder,
  setInputValue,
  handleClick,
}: Props) => {
  return (
    <StyledMainWrapper>
      <StyledMainText>{text}</StyledMainText>
      <InputBox
        className={className}
        height="100%"
        width="100%"
        placeholdText={placeholder}
        type={type}
        inputValue={inputValue}
        setInputValue={(e: ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        handleClick={handleClick}
      />
    </StyledMainWrapper>
  );
};

export default memo(InputBoxAndText);
