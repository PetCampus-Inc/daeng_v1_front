import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";
import {
  Container,
  InputBoxWrapper,
  StyledBottomWrapper,
  TextWrapper,
} from "./styles";
import Header from "components/common/Header";
import Text from "components/common/Text";
import InputBoxAndText from "components/SignIn/InputBoxAndText";
import Button from "components/common/Button";
import { REGISTRATION_REGEX, SCHOOL_PHONE_REGEX } from "constants/validCheck";
import { ThemeConfig } from "styles/ThemeConfig";

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  schoolName: string;
  setSchoolName: Dispatch<SetStateAction<string>>;
  schoolPhone: string;
  setSchoolPhone: Dispatch<SetStateAction<string>>;
  schoolNum: string;
  setSchoolNum: Dispatch<SetStateAction<string>>;
  schoolAddress: string;
  setSchoolAddress: Dispatch<SetStateAction<string>>;
}

const Step4 = ({
  currentStep,
  setCurrentStep,
  schoolName,
  setSchoolName,
  schoolPhone,
  setSchoolPhone,
  schoolNum,
  setSchoolNum,
  schoolAddress,
  setSchoolAddress,
}: Props) => {
  const [isSchoolPhoneValid, setIsSchoolPhoneValid] = useState(false);
  const [isRegistrationValid, setIsRegistrationValid] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleValidCheck = () => {
    setIsClicked(true);
    REGISTRATION_REGEX.test(schoolNum)
      ? setIsRegistrationValid(true)
      : setIsRegistrationValid(false);
  };

  useEffect(() => {
    SCHOOL_PHONE_REGEX.test(schoolPhone)
      ? setIsSchoolPhoneValid(true)
      : setIsSchoolPhoneValid(false);
  }, [schoolPhone]);

  return (
    <Container padding_top="35%">
      <Header
        type="back"
        handleClick={() => {
          setCurrentStep(currentStep - 1);
        }}
      />
      <TextWrapper margin_bottom="8%">
        <Text
          text={"박유빈 원장님"}
          size="1.4rem"
          weight="bold"
          height="2rem"
        />
        <Text
          text={"유치원 정보를 입력해 주세요"}
          size="1.4rem"
          weight="bold"
          height="2rem"
        />
      </TextWrapper>
      <InputBoxWrapper height="70%">
        <InputBoxAndText
          text="유치원명"
          type="text"
          placeholder="유치원 이름을 입력해 주세요"
          inputValue={schoolName}
          setInputValue={setSchoolName}
        />
        <InputBoxAndText
          text="유치원 연락처"
          placeholder="유치원 연락처를 입력해 주세요"
          type="text"
          inputValue={schoolPhone}
          setInputValue={setSchoolPhone}
        />
        <InputBoxAndText
          text="유치원 주소"
          placeholder="주소를 검색해 주세요"
          type="search"
          inputValue={schoolAddress}
          setInputValue={setSchoolAddress}
        />
        <InputBoxAndText
          text="사업자 등록번호"
          placeholder="사업자 등록번호를 입력해 주세요"
          type="check"
          inputValue={schoolNum}
          setInputValue={setSchoolNum}
          handleClick={handleValidCheck}
          errorText={
            isClicked
              ? isRegistrationValid
                ? ""
                : "올바르지 않은 사업자 등록 번호입니다."
              : ""
          }
        />
      </InputBoxWrapper>
      <StyledBottomWrapper>
        <Button
          width="90%"
          height="70%"
          text={"등록하기"}
          weight="bold"
          size="1.1rem"
          handleClick={() => {
            schoolName !== "" &&
              schoolAddress !== "" &&
              isSchoolPhoneValid &&
              isRegistrationValid &&
              setCurrentStep(currentStep + 1);
          }}
          backcolor={
            schoolName === "" ||
            !isSchoolPhoneValid ||
            !isRegistrationValid ||
            schoolAddress === ""
              ? ThemeConfig.gray_5
              : ThemeConfig.gray_1
          }
          textcolor={
            schoolName === "" ||
            !isSchoolPhoneValid ||
            !isRegistrationValid ||
            schoolAddress === ""
              ? ThemeConfig.gray_3
              : ThemeConfig.white
          }
        />
      </StyledBottomWrapper>
    </Container>
  );
};

export default memo(Step4);
