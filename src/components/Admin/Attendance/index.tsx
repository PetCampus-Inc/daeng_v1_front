import { memo, useState } from "react";
import {
  Container,
  StyledHeadWrapper,
  StyledTitleWrapper,
  StyledButtonWrapper,
  StyledImage,
} from "./styles";
import Button from "components/common/Button";
import Text from "components/common/Text";
import { ThemeConfig } from "styles/ThemeConfig";

const Attendance = () => {
  const [isChecking, setIsChecking] = useState(false);

  return (
    <Container>
      <StyledHeadWrapper>
        <StyledTitleWrapper>
          <Text
            text={"박유빈 선생님 안녕하세요"}
            size="1.3rem"
            weight="bold"
            height="2rem"
          />
          <Text
            text={isChecking ? "출석 진행중이에요" : "똑독 유치원 친구들이에요"}
            size="1rem"
            color={ThemeConfig.gray_2}
          />
        </StyledTitleWrapper>
        <StyledButtonWrapper>
          <StyledImage
            src={
              isChecking
                ? "/images/active-foot-button.png"
                : "/images/default-foot-button.png"
            }
            alt="default-foot-button"
          />
          <Button
            width="60%"
            height="27%"
            text={isChecking ? "출석중단" : "출 석"}
            radius="15px"
            weight="600"
            handleClick={() => setIsChecking(!isChecking)}
            border={
              isChecking ? "none" : `solid 1px ${ThemeConfig.primaryColor}`
            }
            backcolor={isChecking ? ThemeConfig.br_2 : ThemeConfig.white}
            textcolor={
              isChecking ? ThemeConfig.white : ThemeConfig.primaryColor
            }
          ></Button>
        </StyledButtonWrapper>
      </StyledHeadWrapper>
    </Container>
  );
};

export default memo(Attendance);
