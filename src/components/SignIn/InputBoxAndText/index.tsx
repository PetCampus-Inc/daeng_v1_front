import { memo, SetStateAction, ChangeEvent } from "react";
import {
  StyledMainWrapper,
  StyledMainText,
  StyledErrorText,
  StyledTextWrapper,
} from "./styles";
import InputBox from "components/common/InputBox";
import { ThemeConfig } from "styles/ThemeConfig";

interface Props {
  text: string;
  errorText?: string;
  type: string;
  className?: string;
  inputValue: any;
  placeholder?: string;
  setInputValue: (e: any) => void | SetStateAction<any>;
  handleClick?: () => void | Promise<void>;
  onChange?: (e: any) => void | ChangeEvent<HTMLInputElement>;
}

const InputBoxAndText = ({
  text,
  errorText,
  type,
  className,
  inputValue,
  placeholder,
  setInputValue,
  handleClick,
  onChange,
}: Props) => {
  return (
    <StyledMainWrapper>
      <StyledTextWrapper>
        <StyledMainText>{text}</StyledMainText>
        <StyledErrorText>{errorText}</StyledErrorText>
      </StyledTextWrapper>
      <InputBox
        color={errorText ? ThemeConfig.red_1 : ThemeConfig.black}
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
        onChange={onChange}
      />
    </StyledMainWrapper>
  );
};

export default memo(InputBoxAndText);
