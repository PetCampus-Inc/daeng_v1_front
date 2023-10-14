import { ChangeEvent, Dispatch, SetStateAction, memo } from "react";
import { Container, InputBoxWrapper, StyledBottomWrapper } from "./styles";
import Header from "components/common/Header";
import Text from "components/common/Text";
import { TextWrapper } from "./styles";
import InputBox from "components/common/InputBox";
import InputBoxAndText from "components/SignIn/InputBoxAndText";
import Button from "components/common/Button";

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
  return (
    <Container>
      <Header
        type="back"
        handleClick={() => {
          className === "teacher"
            ? setCurrentStep(currentStep - 1)
            : setCurrentMainStep(currentMainStep - 1);
        }}
      />
      <TextWrapper margin_bottom="5%">
        <Text
          text={"정보를 입력해 주세요"}
          size="1.4rem"
          weight="bold"
          height="2rem"
        />
      </TextWrapper>
      <InputBoxWrapper height="70%">
        <InputBoxAndText
          text="이름"
          type="text"
          inputValue={userName}
          setInputValue={setUserName}
        />
        <InputBoxAndText
          text="연락처"
          type="text"
          inputValue={userPhone}
          setInputValue={setUserPhone}
        />
      </InputBoxWrapper>
      <StyledBottomWrapper>
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
            userPhone === "" || userName === "" ? "#F6F6F6" : "#525252"
          }
          textcolor={
            userPhone === "" || userName === "" ? "#B5B5B5" : "#FFFFFF"
          }
        />
      </StyledBottomWrapper>
    </Container>
  );
};

export default memo(Step2);
