import { DOGOWNER, PRINCIPAL, TEACHER } from "constants/className";
import { NAME_REGEX, PHONE_REGEX } from "constants/validCheck";

import Button from "components/common/Button";
import Header from "components/common/Header";
import Typo from "components/common/Typo";
import InputBoxAndText from "components/SignIn/InputBoxAndText";
import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";
import { ThemeConfig } from "styles/ThemeConfig";
import { formatPhoneNumber } from "utils/formatter";

import { TextWrapper } from "./styles";
import { Container, InputBoxWrapper, StyledBottomWrapper } from "./styles";

interface Props {
  currentMainStep: number;
  setCurrentMainStep: Dispatch<SetStateAction<number>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  userPhone: string;
  setUserPhone: Dispatch<SetStateAction<string>>;
  className: string;
}

// ** 견주 회원가입 승인신청 승인요청 취소, 선생님 승인요청 api 추가수정 필요**
const Step2 = ({
  currentMainStep,
  setCurrentMainStep,
  currentStep,
  setCurrentStep,
  userName,
  setUserName,
  userPhone,
  setUserPhone,
  className
}: Props) => {
  const [isNameValid, setisNameValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  useEffect(() => {
    NAME_REGEX.test(userName) ? setisNameValid(true) : setisNameValid(false);
    PHONE_REGEX.test(userPhone) ? setIsPhoneValid(true) : setIsPhoneValid(false);
  }, [userName, userPhone]);

  // 번호 하이픈 자동생성
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    setUserPhone(formattedValue);
  };

  return (
    <Container>
      <Header
        type="back"
        handleClick={() => {
          className === TEACHER || className === DOGOWNER
            ? setCurrentStep(currentStep - 1)
            : setCurrentMainStep(currentMainStep - 1);
        }}
      />
      <TextWrapper margin_bottom="5%">
        <Typo
          text={
            className === DOGOWNER
              ? "견주님 이름을\n입력하고 승인 신청을 해주세요"
              : "정보를 입력해 주세요"
          }
          size="1.4rem"
          weight="bold"
          height="2rem"
        />
      </TextWrapper>
      <InputBoxWrapper height="70%">
        <InputBoxAndText
          text="이름"
          type="text"
          placeholder="홍길동"
          inputValue={userName}
          setInputValue={setUserName}
        />
        {className !== DOGOWNER ? (
          <InputBoxAndText
            text="연락처"
            type="text"
            placeholder="연락처를 입력해 주세요"
            inputValue={userPhone}
            setInputValue={setUserPhone}
            onChange={handleInputChange}
          />
        ) : null}
      </InputBoxWrapper>
      <StyledBottomWrapper>
        {className === TEACHER || className === PRINCIPAL ? (
          <Button
            width="90%"
            height="70%"
            text="다음"
            weight="bold"
            size="1.1rem"
            handleClick={() => {
              if (isNameValid && isPhoneValid) {
                setCurrentStep(currentStep + 1);
              }
            }}
            backcolor={
              isNameValid && isPhoneValid
                ? ThemeConfig.colors.primaryColor
                : ThemeConfig.colors.gray_5
            }
            textcolor={
              isNameValid && isPhoneValid ? ThemeConfig.colors.white : ThemeConfig.colors.gray_2
            }
          />
        ) : (
          <Button
            width="90%"
            height="70%"
            text="승인 신청하기"
            weight="bold"
            size="1.1rem"
            handleClick={() => {
              if (className !== DOGOWNER && isNameValid && isPhoneValid) {
                setCurrentStep(currentStep + 1);
              }
              if (className === DOGOWNER && isNameValid) {
                setCurrentStep(currentStep + 1);
              }
            }}
            backcolor={
              isNameValid && userName !== ""
                ? ThemeConfig.colors.primaryColor
                : ThemeConfig.colors.gray_5
            }
            textcolor={
              isNameValid && userName !== "" ? ThemeConfig.colors.white : ThemeConfig.colors.gray_2
            }
          />
        )}
      </StyledBottomWrapper>
    </Container>
  );
};

export default memo(Step2);
