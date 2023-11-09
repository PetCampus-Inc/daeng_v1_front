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
import useShowPw from "hooks/useShowPw";
import Button from "components/common/Button";
import { TEACHER } from "constants/className";
import { ID_REGEX, PW_REGEX } from "constants/validCheck";
import { ThemeConfig } from "styles/ThemeConfig";

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  userPw: string;
  setUserPw: Dispatch<SetStateAction<string>>;
  className: string;
  handlerGetCheckId: () => void | Promise<void>;
  setConfirmedId: Dispatch<SetStateAction<boolean>>;
  confirmedId: boolean;
}

const Step3 = ({
  currentStep,
  setCurrentStep,
  userId,
  setUserId,
  userPw,
  setUserPw,
  className,
  handlerGetCheckId,
  setConfirmedId,
  confirmedId,
}: Props) => {
  const [checkUserId, setCheckUserId] = useState(false);
  const [checkUserPw, setCheckUserPw] = useState("");
  const { showPw, setShowPw, handleToggle } = useShowPw();
  const [isIdValid, setIsIdValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    ID_REGEX.test(userId) ? setIsIdValid(true) : setIsIdValid(false);
    PW_REGEX.test(userPw) ? setIsPwValid(true) : setIsPwValid(false);
    PW_REGEX.test(checkUserPw) ? setIsPwValid(true) : setIsPwValid(false);
  }, [userId, userPw, checkUserPw]);

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
            className === TEACHER
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
          placeholder="아이디를 입력해 주세요"
          className="id"
          type="check"
          inputValue={userId}
          setInputValue={setUserId}
          handleClick={
            isIdValid
              ? () => {
                  handlerGetCheckId();
                  setCheckUserId(true);
                }
              : () => {}
          }
          errorText={
            checkUserId ? (confirmedId ? "" : "사용 불가능한 ID 입니다.") : ""
          }
        />
        <InputBoxAndText
          text="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          className={showPw.className}
          type={showPw.type}
          inputValue={userPw}
          setInputValue={setUserPw}
          handleClick={handleToggle}
          errorText={
            isClicked
              ? !isPwValid || userPw !== checkUserPw
                ? "비밀번호가 일치하지 않습니다."
                : ""
              : ""
          }
        />
        <InputBoxAndText
          text="비밀번호 확인"
          placeholder="비밀번호를 입력해 주세요"
          className={showPw.className}
          type={showPw.type}
          inputValue={checkUserPw}
          setInputValue={setCheckUserPw}
          handleClick={handleToggle}
          errorText={
            isClicked
              ? !isPwValid || userPw !== checkUserPw
                ? "비밀번호가 일치하지 않습니다."
                : ""
              : ""
          }
        />
      </InputBoxWrapper>
      <StyledBottomWrapper>
        <Button
          width="90%"
          height="70%"
          text={className === TEACHER ? "가입하기" : "다음"}
          weight="bold"
          size="1.1rem"
          handleClick={() => {
            if (
              confirmedId &&
              isPwValid &&
              userPw === checkUserPw &&
              checkUserId
            ) {
              setCurrentStep(currentStep + 1);
            } else if (!confirmedId || !isPwValid) {
            } else {
              setIsClicked(true);
            }
          }}
          backcolor={
            !isIdValid || !isPwValid || !checkUserId
              ? ThemeConfig.gray_5
              : ThemeConfig.primaryColor
          }
          textcolor={
            !isIdValid || !isPwValid || !checkUserId
              ? ThemeConfig.gray_3
              : ThemeConfig.white
          }
        />
      </StyledBottomWrapper>
    </Container>
  );
};

export default memo(Step3);
