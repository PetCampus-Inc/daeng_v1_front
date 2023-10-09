import { memo, SetStateAction } from "react";
import {
  StyledWrapper,
  StyledButtonWrapper,
  StyledMainWrapper,
  StyledImage,
} from "./styles";

interface Props {
  width: string;
  height: string;
  className?: string;
  placeholdText?: string;
  inputValue: any;
  setInputValue: (e: any) => void | SetStateAction<any>;
  type?: string;
  handleClick?: () => void | Promise<void>;
}

const InputBox = ({
  width,
  height,
  className,
  placeholdText,
  inputValue,
  setInputValue,
  type,
  handleClick,
}: Props) => {
  return (
    <StyledMainWrapper width={width} height={height} className={className}>
      <StyledWrapper
        placeholder={placeholdText}
        type={type}
        value={inputValue}
        onChange={setInputValue}
      />
      {type === "search" && (
        <StyledButtonWrapper onClick={handleClick}>
          <StyledImage src="images/search.png" alt="bell-icon" />
        </StyledButtonWrapper>
      )}
      {className === "password" && (
        <StyledButtonWrapper onClick={handleClick}>
          <StyledImage src="images/opened-eye.png" alt="opened-eye" />
        </StyledButtonWrapper>
      )}
      {className === "text" && (
        <StyledButtonWrapper onClick={handleClick}>
          <StyledImage src="images/closed-eye.png" alt="closed-eye" />
        </StyledButtonWrapper>
      )}
    </StyledMainWrapper>
  );
};

export default memo(InputBox);
