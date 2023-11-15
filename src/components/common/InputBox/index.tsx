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
import { ATTENDANCE } from "constants/className";

interface Props {
  width: string;
  height: string;
  shadow?: string;
  radius?: string;
  color?: string;
  valid?: boolean;
  border?: string;
  className?: string;
  placeholdText?: string;
  inputValue: any;
  setInputValue: (e: any) => void | SetStateAction<any>;
  selectedSearchText?: string;
  type?: string;
  handleClick?: () => void | Promise<void>;
  onChange?: (e: any) => void | React.ChangeEvent<HTMLInputElement>;
  onFocus?: (e: any) => void | React.FocusEvent<HTMLInputElement>;
  onBlur?: (e: any) => void | React.FocusEvent<HTMLInputElement>;
}

const InputBox = ({
  width,
  height,
  shadow,
  color,
  radius,
  valid,
  border,
  className,
  placeholdText,
  inputValue,
  setInputValue,
  selectedSearchText,
  type,
  handleClick,
  onChange,
  onFocus,
  onBlur,
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
    <StyledMainWrapper
      width={width}
      height={height}
      shadow={shadow}
      className={className}
      radius={radius}
    >
      <StyledWrapper
        placeholder={placeholdText}
        type={type}
        value={inputValue}
        onChange={onChange ? onChange : setInputValue}
        onFocus={onFocus}
        onBlur={onBlur}
        color={color}
        border={border}
        radius={radius}
      />
      {type === "search" &&
        (className === ATTENDANCE ? (
          <StyledButtonWrapper onClick={handleClick}>
            {selectedSearchText === "" || inputValue === "" ? (
              <StyledImage src="/images/brown-search.png" alt="search-icon" />
            ) : (
              <StyledImage src="/images/brown-x-button.png" alt="x-box" />
            )}
          </StyledButtonWrapper>
        ) : (
          <StyledButtonWrapper onClick={handleClick}>
            {selectedSearchText === "" || inputValue === "" ? (
              <StyledImage src="/images/search.png" alt="search-icon" />
            ) : (
              <StyledImage src="/images/x-box.png" alt="x-box" />
            )}
          </StyledButtonWrapper>
        ))}
      {type === "check" && (
        <StyledButtonWrapper onClick={handleClick}>
          <Button
            width="100%"
            height="40%"
            size="80%"
            weight="500"
            textcolor={isValid ? ThemeConfig.white : ThemeConfig.gray_3}
            backcolor={isValid ? ThemeConfig.primaryColor : ThemeConfig.gray_5}
          >
            {className === "id" ? "중복확인" : "인증하기"}
          </Button>
        </StyledButtonWrapper>
      )}
      {className === "password" && (
        <StyledButtonWrapper onClick={handleClick}>
          <StyledImage src="/images/opened-eye.png" alt="opened-eye" />
        </StyledButtonWrapper>
      )}
      {className === "text" && (
        <StyledButtonWrapper onClick={handleClick}>
          <StyledImage src="/images/closed-eye.png" alt="closed-eye" />
        </StyledButtonWrapper>
      )}
    </StyledMainWrapper>
  );
};

export default memo(InputBox);
