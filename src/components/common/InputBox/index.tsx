import { memo, SetStateAction, useEffect, useState } from "react";
import Button from "../Button";
import {
  StyledWrapper,
  StyledButtonWrapper,
  StyledMainWrapper,
  StyledImage,
} from "./styles";
import { ID_REGEX, REGISTRATION_REGEX } from "constants/validCheck";
import { ThemeConfig } from "styles/ThemeConfig";

interface Props {
  width: string;
  height: string;
  color?: string;
  valid?: boolean;
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
  color,
  valid,
  className,
  placeholdText,
  inputValue,
  setInputValue,
  selectedSearchText,
  type,
  handleClick,
}: Props) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    className === "id"
      ? ID_REGEX.test(inputValue)
        ? setIsValid(true)
        : setIsValid(false)
      : REGISTRATION_REGEX.test(inputValue)
      ? setIsValid(true)
      : setIsValid(false);
  }, [inputValue]);

  return (
    <StyledMainWrapper width={width} height={height} className={className}>
      <StyledWrapper
        placeholder={placeholdText}
        type={type}
        value={inputValue}
        onChange={setInputValue}
        color={color}
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
            textcolor={isValid ? ThemeConfig.white : ThemeConfig.gray_3}
            backcolor={isValid ? ThemeConfig.gray_1 : ThemeConfig.gray_5}
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
