import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";
import { Container, InputBoxWrapper, StyledBottomWrapper } from "./styles";
import Header from "components/common/Header";
import Text from "components/common/Text";
import { TextWrapper } from "./styles";
import InputBoxAndText from "components/SignIn/InputBoxAndText";
import Button from "components/common/Button";
import { DOGOWNER, TEACHER } from "constants/className";
import { NAME_REGEX, PHONE_REGEX } from "constants/validCheck";
import { ThemeConfig } from "styles/ThemeConfig";

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

const Step2 = ({
  currentMainStep,
  setCurrentMainStep,
  currentStep,
  setCurrentStep,
  userName,
  setUserName,
  userPhone,
  setUserPhone,
  className,
}: Props) => {
  const [isNameValid, setisNameValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  useEffect(() => {
    NAME_REGEX.test(userName) ? setisNameValid(true) : setisNameValid(false);
    PHONE_REGEX.test(userPhone)
      ? setIsPhoneValid(true)
      : setIsPhoneValid(false);
  }, [userName, userPhone]);

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
        <Text
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
          />
        ) : null}
      </InputBoxWrapper>
      <StyledBottomWrapper>
        {className === TEACHER ? (
          <Button
            width="90%"
            height="70%"
            text="다음"
            weight="bold"
            size="1.1rem"
            handleClick={() => {
              setCurrentStep(currentStep + 1);
            }}
            backcolor={
              isNameValid && isPhoneValid
                ? ThemeConfig.gray_1
                : ThemeConfig.gray_5
            }
            textcolor={
              isNameValid && isPhoneValid
                ? ThemeConfig.white
                : ThemeConfig.gray_3
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
              setCurrentStep(currentStep + 1);
            }}
            backcolor={
              isNameValid && userName !== ""
                ? ThemeConfig.gray_1
                : ThemeConfig.gray_5
            }
            textcolor={
              isNameValid && userName !== ""
                ? ThemeConfig.white
                : ThemeConfig.gray_3
            }
          />
        )}
      </StyledBottomWrapper>
    </Container>
  );
};

export default memo(Step2);
