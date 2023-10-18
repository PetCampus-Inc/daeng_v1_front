import { Dispatch, SetStateAction, memo } from "react";
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
            setCurrentStep(currentStep + 1);
          }}
          backcolor={
            schoolName === "" ||
            schoolPhone === "" ||
            schoolNum === "" ||
            schoolAddress === ""
              ? "#F6F6F6"
              : "#525252"
          }
          textcolor={
            schoolName === "" ||
            schoolPhone === "" ||
            schoolNum === "" ||
            schoolAddress === ""
              ? "#B5B5B5"
              : "#FFFFFF"
          }
        />
      </StyledBottomWrapper>
    </Container>
  );
};

export default memo(Step4);
