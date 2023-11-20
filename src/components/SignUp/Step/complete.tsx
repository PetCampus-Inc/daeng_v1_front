import {
  Container,
  StyledBottomWrapper,
  StyledCancleButton,
  StyledLink,
  TextWrapper,
} from "./styles";
import { Dispatch, SetStateAction } from "react";
import Text from "components/common/Text";
import Button from "components/common/Button";
import { DOGOWNER, TEACHER } from "constants/className";
import { ThemeConfig } from "styles/ThemeConfig";

interface Props {
  setCurrentMainStep: Dispatch<SetStateAction<number>>;
  selectedSearchText?: string;
  schoolName?: string;
  className: string;
}

const Complete = ({
  setCurrentMainStep,
  selectedSearchText,
  schoolName,
  className,
}: Props) => {
  return (
    <Container>
      <TextWrapper margin_bottom="5%">
        <Text
          text={schoolName ? schoolName : selectedSearchText}
          size="1.4rem"
          weight="bold"
          height="2rem"
          color={ThemeConfig.primaryColor}
        />
        <Text
          text={
            className === TEACHER
              ? "승인 신청이 완료되었습니다"
              : className === DOGOWNER
              ? "승인 신청이 완료되었습니다"
              : "등록이 완료 되었습니다"
          }
          size="1.4rem"
          weight="bold"
          height="2rem"
        />
        {className === TEACHER && (
          <Text
            text={"승인 완료시 알림으로 알려드릴게요"}
            size="1rem"
            color={ThemeConfig.gray_3}
          />
        )}
      </TextWrapper>
      <StyledBottomWrapper height={className === DOGOWNER ? "7%" : "9%"}>
        <>
          {className === TEACHER && (
            <StyledCancleButton>승인 신청 취소하기 {`>`}</StyledCancleButton>
          )}
          <StyledLink to="/SignIn">
            <Button
              width="100%"
              height="100%"
              text={className === DOGOWNER ? "시작하기" : "확인"}
              weight="bold"
              size="1.1rem"
              handleClick={() => {
                setCurrentMainStep(0);
              }}
              backcolor={ThemeConfig.primaryColor}
              textcolor={ThemeConfig.white}
            />
          </StyledLink>
        </>
      </StyledBottomWrapper>
    </Container>
  );
};

export default Complete;
