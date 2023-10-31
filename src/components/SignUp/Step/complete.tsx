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
  className: string;
}

const Complete = ({ setCurrentMainStep, className }: Props) => {
  return (
    <Container>
      <TextWrapper margin_bottom="5%">
        <Text
          text={"뿅뿅 애견 유치원"}
          size="1.4rem"
          weight="bold"
          height="2rem"
        />
        <Text
          text={
            className === TEACHER
              ? "승인이 완료되었습니다"
              : className === DOGOWNER
              ? "승인 신청이 완료되었습니다"
              : "등록이 완료 되었습니다"
          }
          size="1.4rem"
          weight="bold"
          height="2rem"
        />
        {className === DOGOWNER && (
          <Text text={"승인 완료시 알림으로 알려드릴게요"} size="1rem" />
        )}
      </TextWrapper>
      <StyledBottomWrapper height={className === DOGOWNER ? "9%" : "7%"}>
        <>
          {className === DOGOWNER && (
            <StyledCancleButton>승인 신청 취소하기</StyledCancleButton>
          )}
          <StyledLink to="/SignIn">
            <Button
              width="100%"
              height="100%"
              text={className === TEACHER ? "시작하기" : "확인"}
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
