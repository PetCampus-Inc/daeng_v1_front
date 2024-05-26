import AlertRed from "assets/svg/alert-red-icon";
import AttendanceIcon from "assets/svg/attendance-icon";
import CalendarIcon from "assets/svg/calendar";
import RemainCountIcon from "assets/svg/remain-count-icon";
import { DetailItem, TextWrapper } from "components/Admin/DogDetailInfo/DogInfo/AboutDog/styles";
import { Flex } from "components/common";
import { useGetMemberDogEnrollmemntInfo, useGetMemberSchoolInfo } from "hooks/api/member/member";
import { formatDate } from "utils/formatter";
import { remainingExpirationDays } from "utils/remainingDays";

import Calendar from "./Calender/Calendar";
import * as S from "./styles";
import { Icon } from "../styles";

interface IProps {
  dogId: number;
}

const AttendanceTicketInfo = ({ dogId }: IProps) => {
  // FIXME useGetMemberDogEnrollmemntInfo와 useGetMemberSchoolInfo 불러오는 데이터가 달라 확인 필요
  const { data } = useGetMemberDogEnrollmemntInfo(dogId);
  const { data: schoolInfo } = useGetMemberSchoolInfo(String(dogId));

  const { ticket } = schoolInfo;

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

  const remainDays = remainingExpirationDays(ticket.ticketExpirationDate);
  const isRound = ticket.ticketType === "ROUND";

  const isRoundWarning = ticket.currentRoundTicket <= 2; // 잔여 2회 부터 경고
  const isMonthlyWarning = remainDays && remainDays <= 3; // 만료 3일전 부터 경고

  const isWarning = isRoundWarning || isMonthlyWarning;
  const isDeadline = ticket.currentRoundTicket < 0 || (remainDays && remainDays < 0);

  return (
    <Flex direction="column" gap="41">
      <section>
        <S.DogDetailInfoText className="big">출결</S.DogDetailInfoText>
        <Calendar />
      </section>

      <section>
        <S.DogDetailInfoText className="big">이용권 정보</S.DogDetailInfoText>
        <S.TicketInfoCard className={isDeadline ? "deadline" : ""}>
          {isDeadline && <span className="deadlineIcon">만료됨</span>}
          <S.Wrapper>
            <S.UpperContainer>
              <S.DogDetailInfoPointText>{isRound ? "회차권" : "정기권"}</S.DogDetailInfoPointText>
              <S.DogDetailInfoText className="big">
                {isRound ? `${ticket.allRoundTicket}회` : `${ticket.monthlyTicketNumber}주`}
              </S.DogDetailInfoText>
            </S.UpperContainer>
            <S.BottomContainer>
              <DetailItem className="row">
                <S.TicketTextBox className={isWarning ? "warning" : ""}>
                  {isRound ? (
                    <>
                      <Icon>{isRoundWarning ? <AlertRed /> : <RemainCountIcon />}</Icon>
                      잔여횟수 : {ticket.currentRoundTicket}회
                    </>
                  ) : (
                    <>
                      <Icon>{isMonthlyWarning ? <AlertRed /> : <RemainCountIcon />}</Icon>
                      만료일 : {expirationDate && expirationDate}
                      {isMonthlyWarning && `(만료${remainDays < 0 ? "0" : remainDays}일전)`}
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
