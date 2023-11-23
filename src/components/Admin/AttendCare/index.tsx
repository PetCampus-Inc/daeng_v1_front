import Text from "components/common/Text";
import { Container, StyledCardWrapper } from "../Attendance/styles";
import { ThemeConfig } from "styles/ThemeConfig";
import {
  StyledHeadWrapper,
  StyledTextWrapper,
  StyledBottomWrapper,
} from "./styles";
import Button from "components/common/Button";
import { useState } from "react";

const AttendCare = () => {
  const [selectedDogId, setSelectedDogId] = useState<number[]>([]);
  return (
    <Container>
      <StyledHeadWrapper>
        <StyledTextWrapper>
          <Text
            text="오늘 관리할 강아지"
            size="1.2rem"
            weight="bold"
            height="2rem"
            color={ThemeConfig.darkBlack}
          />
          <Text text={`총 0마리`} color={ThemeConfig.gray_1} />
        </StyledTextWrapper>
        <Text
          text="출석한 강아지 중 오늘 관리할 강아지를 추가해주세요"
          size="1rem"
          color={ThemeConfig.gray_2}
        />
      </StyledHeadWrapper>
      <StyledCardWrapper></StyledCardWrapper>
      <StyledBottomWrapper>
        <Button
          width="100%"
          height="100%"
          text="관리 목록에 추가"
          backcolor={
            selectedDogId.length > 0
              ? ThemeConfig.primaryColor
              : ThemeConfig.gray_4
          }
          textcolor={
            selectedDogId.length > 0 ? ThemeConfig.white : ThemeConfig.gray_2
          }
          weight="700"
          handleClick={() => {}}
        />
      </StyledBottomWrapper>
    </Container>
  );
};

export default AttendCare;
