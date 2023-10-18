import { memo, SetStateAction } from "react";
import Button from "../Button";
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
  selectedSearchText?: string;
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
  selectedSearchText,
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
          {selectedSearchText === "" ? (
            <StyledImage src="images/search.png" alt="search-icon" />
          ) : (
            <StyledImage src="images/x-box.png" alt="x-box" />
          )}
        </StyledButtonWrapper>
      )}
      {type === "check" && (
        <StyledButtonWrapper onClick={handleClick}>
          <Button
            width="100%"
            height="40%"
            size="80%"
            weight="500"
            textcolor={inputValue ? "#ffffff" : "#B5B5B5"}
            backcolor={inputValue ? "#525252" : "#f6f6f6"}
          >
            {className === "id" ? "중복확인" : "인증하기"}
          </Button>
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
