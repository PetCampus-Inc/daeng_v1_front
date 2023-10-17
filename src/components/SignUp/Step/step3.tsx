import { Dispatch, SetStateAction, memo, useState } from "react";
import {
  Container,
  InputBoxWrapper,
  StyledBottomWrapper,
  TextWrapper,
} from "./styles";
import Header from "components/common/Header";
import Text from "components/common/Text";
import InputBoxAndText from "components/SignIn/InputBoxAndText";
import useShowPw from "hooks/useShowPw";
import Button from "components/common/Button";

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  userPw: string;
  setUserPw: Dispatch<SetStateAction<string>>;
  className: string;
}

const Step3 = ({
  currentStep,
  setCurrentStep,
  userId,
  setUserId,
  userPw,
  setUserPw,
  className,
}: Props) => {
  const [checkUserPw, setCheckUserPw] = useState("");
  const { showPw, setShowPw, handleToggle } = useShowPw();

  return (
    <Container>
      <Header
        type="back"
        handleClick={() => {
          setCurrentStep(currentStep - 1);
        }}
      />
      <TextWrapper margin_bottom="5%">
        <Text
          text={
            className === "teacher"
              ? "회원가입을 완료해 주세요"
              : "아이디와 비밀번호를 입력해 주세요"
          }
          size="1.4rem"
          weight="bold"
          height="2rem"
        />
      </TextWrapper>
      <InputBoxWrapper height="70%">
        <InputBoxAndText
          text="아이디"
          className="id"
          type="check"
          inputValue={userId}
          setInputValue={setUserId}
        />
        <InputBoxAndText
          text="비밀번호"
          className={showPw.className}
          type={showPw.type}
          inputValue={userPw}
          setInputValue={setUserPw}
          handleClick={handleToggle}
        />
        <InputBoxAndText
          text="비밀번호 확인"
          className={showPw.className}
          type={showPw.type}
          inputValue={checkUserPw}
          setInputValue={setCheckUserPw}
          handleClick={handleToggle}
        />
      </InputBoxWrapper>
      <StyledBottomWrapper>
        <Button
          width="90%"
          height="70%"
          text={className === "teacher" ? "가입하기" : "다음"}
          weight="bold"
          size="1.1rem"
          handleClick={() => {
            setCurrentStep(currentStep + 1);
          }}
          backcolor={
            userId === "" || userPw === "" || checkUserPw === ""
              ? "#F6F6F6"
              : "#525252"
          }
          textcolor={
            userId === "" || userPw === "" || checkUserPw === ""
              ? "#B5B5B5"
              : "#FFFFFF"
          }
        />
      </StyledBottomWrapper>
    </Container>
  );
};

export default memo(Step3);
