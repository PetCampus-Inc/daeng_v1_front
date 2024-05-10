import AttendanceIcon from "assets/svg/attendance-icon";
import CalendarIcon from "assets/svg/calendar";
import CalendarExpireIcon from "assets/svg/calendar-expire";
import { DetailItem, TextWrapper } from "components/Admin/DogDetailInfo/DogInfo/AboutDog/styles";
import { FlexWrapper } from "components/Admin/DogDetailInfo/styles";
import { Flex } from "components/common";

import * as S from "./styles";
import { Icon } from "../styles";

const AttendanceTicketInfo = () => {
  return (
    <Flex direction="column" gap="41">
      <section>
        <S.DogDetailInfoText className="big">출결</S.DogDetailInfoText>
        <div>달력</div>
      </section>

      <section>
        <S.DogDetailInfoText className="big">이용권 정보</S.DogDetailInfoText>
        <FlexWrapper>
          <S.Wrapper>
            <S.UpperContainer>
              <S.DogDetailInfoPointText>정기권</S.DogDetailInfoPointText>
              <S.DogDetailInfoText className="big">12주</S.DogDetailInfoText>
            </S.UpperContainer>
            <S.BottomContainer>
              <DetailItem className="row">
                <TextWrapper>
                  <Icon>
                    <CalendarExpireIcon />
                  </Icon>
                  만료일 : 2024.02.01
                </TextWrapper>
              </DetailItem>
              <DetailItem className="row">
                <TextWrapper>
                  <Icon>
                    <AttendanceIcon />
                  </Icon>
                  시작일 : 2024.02.01
                </TextWrapper>
              </DetailItem>
              <DetailItem>
                <TextWrapper>
                  <Icon>
                    <CalendarIcon />
                  </Icon>
                  유치원 등원 요일 : 월.목.토
                </TextWrapper>
              </DetailItem>
            </S.BottomContainer>
          </S.Wrapper>
        </FlexWrapper>
      </section>
    </Flex>
  );
};

export default AttendanceTicketInfo;
