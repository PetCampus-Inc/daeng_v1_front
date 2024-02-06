import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";
import { Container, InputBoxWrapper, StyledBottomWrapper, TextWrapper } from "./styles";
import Header from "components/common/Header";
import Text from "components/common/Text";
import InputBoxAndText from "components/SignIn/InputBoxAndText";
import Button from "components/common/Button";
import { PHONE_REGEX, REGISTRATION_REGEX, SCHOOL_PHONE_REGEX } from "constants/validCheck";
import { ThemeConfig } from "styles/ThemeConfig";
import Postcode from "components/SignUp/Postcode";
import useSignUp from "hooks/api/useSignUp";
import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";

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
  handlerCheckSchoolNum: () => void | Promise<void>;
  confirmedSchoolNum: boolean;
  setConfirmedSchoolNum: Dispatch<SetStateAction<boolean>>;
  userName: string;
}

const Step4 = ({
  userName,
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
  handlerCheckSchoolNum,
  confirmedSchoolNum
}: Props) => {
  const [isSchoolPhoneValid, setIsSchoolPhoneValid] = useState(false);
  const [, setIsRegistrationValid] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRegisteredPopupOpen, setIsRegisteredPopupOpen] = useState(false);

  const { handlerOwnerSignup } = useSignUp();

  const handleValidCheck = () => {
    setIsClicked(true);
    handlerCheckSchoolNum();
  };

  // 전화번호 하이픈 자동생성
  const handleSchoolPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value.startsWith("02")) {
      if (value.length > 12) {
        value = value.substring(0, 12);
      }
      setSchoolPhone(value.replace(/[^0-9]/g, "").replace(PHONE_REGEX, `$1-$2-$3`));
    } else {
      if (value.length > 13) {
        value = value.substring(0, 13);
      }
      setSchoolPhone(value.replace(/[^0-9]/g, "").replace(SCHOOL_PHONE_REGEX, `$1-$2-$3`));
    }
  };

  // 사업자번호 하이픈 자동생성
  const handleSchoolNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 12) {
      value = value.substring(0, 12);
    }
    setSchoolNum(
      value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, "$1-$2-$3")
        .replace(/(-{1,2})$/g, "")
    );
  };

  useEffect(() => {
    schoolAddress !== "" && setIsPopupOpen(false);
    SCHOOL_PHONE_REGEX.test(schoolPhone)
      ? setIsSchoolPhoneValid(true)
      : setIsSchoolPhoneValid(false);
    REGISTRATION_REGEX.test(schoolNum)
      ? setIsRegistrationValid(true)
      : setIsRegistrationValid(false);
  }, [schoolPhone, schoolAddress, schoolNum]);

  return (
    <>
      {isPopupOpen && (
        <Container padding_top="25%">
          <Header type="text" text="주소 검색" handleClick={() => setIsPopupOpen(false)} />
          <Postcode schoolAddress={schoolAddress} setSchoolAddress={setSchoolAddress} />
        </Container>
      )}
      {!isPopupOpen && (
        <Container padding_top="35%">
          <Header
            type="back"
            handleClick={() => {
              setCurrentStep(currentStep - 1);
            }}
          />

          <TextWrapper margin_bottom="8%">
            <Text text={`${userName} 원장님`} size="1.4rem" weight="bold" height="2rem" />
            <Text text={"유치원 정보를 입력해 주세요"} size="1.4rem" weight="bold" height="2rem" />
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
              onChange={handleSchoolPhoneChange}
            />
            <InputBoxAndText
              text="유치원 주소"
              placeholder="주소를 검색해 주세요"
              type="search"
              inputValue={schoolAddress}
              setInputValue={setSchoolAddress}
              handleClick={() => {
                setSchoolAddress("");
                setIsPopupOpen(!isPopupOpen);
              }}
            />

            <InputBoxAndText
              text="사업자 등록번호"
              placeholder="사업자 등록번호를 입력해 주세요"
              type="check"
              inputValue={schoolNum}
              setInputValue={setSchoolNum}
              handleClick={handleValidCheck}
              onChange={handleSchoolNumChange}
              errorText={
                isClicked ? (confirmedSchoolNum ? "" : "올바르지 않은 사업자 등록 번호입니다.") : ""
              }
            />
          </InputBoxWrapper>
          <StyledBottomWrapper>
            <Button
              width="90%"
              height="70%"
              text={"등록"}
              weight="bold"
              size="1.1rem"
              handleClick={() => {
                schoolName !== "" &&
                  schoolAddress !== "" &&
                  isSchoolPhoneValid &&
                  confirmedSchoolNum &&
                  handlerOwnerSignup(setIsRegisteredPopupOpen);
              }}
              backcolor={
                schoolName === "" ||
                !isSchoolPhoneValid ||
                !confirmedSchoolNum ||
                schoolAddress === ""
                  ? ThemeConfig.gray_5
                  : ThemeConfig.primaryColor
              }
              textcolor={
                schoolName === "" ||
                !isSchoolPhoneValid ||
                !confirmedSchoolNum ||
                schoolAddress === ""
                  ? ThemeConfig.gray_2
                  : ThemeConfig.white
              }
            />
          </StyledBottomWrapper>
          {isRegisteredPopupOpen && (
            <AlertBottomSheet
              onClose={() => {
                setIsRegisteredPopupOpen(false);
              }}
              title="이미 등록된 유치원입니다"
              content="자세한 내용은 서비스 팀으로 문의해 주세요"
              grayButton="닫기"
              brownButton="문의"
              brownFuc={() => console.log("문의")}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default memo(Step4);
