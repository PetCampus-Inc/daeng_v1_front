import AlertRed from "assets/svg/alert-red-icon";
import AttendanceIcon from "assets/svg/attendance-icon";
import CalendarIcon from "assets/svg/calendar";
import CalendarExpireIcon from "assets/svg/calendar-expire";
import RemainCountIcon from "assets/svg/remain-count-icon";
import { DetailItem, TextWrapper } from "components/Admin/DogDetailInfo/DogInfo/AboutDog/styles";
import { Flex } from "components/common";
import { useGetMemberDogEnrollmemntInfo, useGetMemberSchoolInfo } from "hooks/api/member/member";
import { formatDate } from "utils/formatter";

import * as S from "./styles";
import { Icon } from "../styles";

interface IProps {
  dogId: number;
}

const AttendanceTicketInfo = ({ dogId }: IProps) => {
  const { data } = useGetMemberDogEnrollmemntInfo(dogId);
  const { data: schoolInfo } = useGetMemberSchoolInfo(String(dogId));

  const { ticket } = schoolInfo;

  const isRound = ticket.ticketType === "ROUND";

  const [startYear, startMonth, startDay] = ticket.ticketStartDate;
  const [expirationYear = "", expirationMonth = "", expirationDay = ""] =
    ticket.ticketExpirationDate || [];

  const startDate = formatDate(String(startYear), String(startMonth), String(startDay), "dot");
  const expirationDate = formatDate(
    String(expirationYear),
    String(expirationMonth),
    String(expirationDay),
    "dot"
  );

  return (
    <Flex direction="column" gap="41">
      <section>
        <S.DogDetailInfoText className="big">출결</S.DogDetailInfoText>
        <div>달력</div>
      </section>

      <section>
        <S.DogDetailInfoText className="big">이용권 정보</S.DogDetailInfoText>
        {/* <S.TicketInfoCard className="deadline">  */}
        <S.TicketInfoCard>
          {/* <span className="deadlineIcon">만료됨</span> */}
          <S.Wrapper>
            <S.UpperContainer>
              <S.DogDetailInfoPointText>{isRound ? "회차권" : "정기권"}</S.DogDetailInfoPointText>
              <S.DogDetailInfoText className="big">
                {isRound ? `${ticket.allRoundTicket}회` : `${ticket.monthlyTicketNumber}주`}
              </S.DogDetailInfoText>
            </S.UpperContainer>
            <S.BottomContainer>
              <DetailItem className="row">
                {/* <S.TicketTextBox className="warning"> */}
                <S.TicketTextBox>
                  {/* <Icon>
                    <AlertRed />
                  </Icon> */}
                  {isRound ? (
                    <>
                      <Icon>
                        <RemainCountIcon />
                      </Icon>
                      잔여횟수 : {ticket.currentRoundTicket} 회
                    </>
                  ) : (
                    <>
                      <Icon>
                        <CalendarExpireIcon />
                      </Icon>
                      만료일 : {expirationDate && expirationDate}
                    </>
                  )}
                </S.TicketTextBox>
              </DetailItem>
              <DetailItem className="row">
                <TextWrapper>
                  <Icon>
                    <AttendanceIcon />
                  </Icon>
                  시작일 : {startDate}
                </TextWrapper>
              </DetailItem>
              <DetailItem>
                <TextWrapper>
                  <Icon>
                    <CalendarIcon />
                  </Icon>
                  유치원 등원 요일 : {ticket.attendanceDays ? ticket.attendanceDays.join(".") : ""}
                </TextWrapper>
              </DetailItem>
            </S.BottomContainer>
          </S.Wrapper>
        </S.TicketInfoCard>
      </section>
    </Flex>
  );
};

export default AttendanceTicketInfo;
