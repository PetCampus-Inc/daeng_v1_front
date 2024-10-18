import Calendar from "assets/svg/calendar";
import List from "assets/svg/list-normal-school-icon";
import Map from "assets/svg/map-pin-icon";
import Phone from "assets/svg/phone-basic";
import PhoneIcon from "assets/svg/phone-icon";
import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import CallSchoolBottomSheet from "components/common/BottomSheet/CallBottomSheet/CallSchoolBottomSheet";
import { WideButton } from "components/common/Button";
import { BasicModal } from "components/common/Modal";
import { useGetMemberSchoolInfo } from "hooks/api/member/member";
import { usePostMemberDogSchool } from "hooks/api/member/school";
import { useOverlay } from "hooks/common/useOverlay";
import { useNavigate } from "react-router-dom";
import { formatDate } from "utils/formatter";
import { remainingDays } from "utils/remainingDays";
import showToast from "utils/showToast";

import * as S from "./styles";

// TODO title, text 공통 컴포넌트로 관리하기
const SchoolInfo = ({ dogId }: { dogId: string }) => {
  const navigate = useNavigate();
  const overlay = useOverlay();
  const { data } = useGetMemberSchoolInfo(dogId);
  const mutateMemberDogSchoolDelete = usePostMemberDogSchool(dogId);

  const registeredDate = data.registeredDate?.map((el) => String(el));
  const registeredTime =
    registeredDate && formatDate(registeredDate[0], registeredDate[1], registeredDate[2], "dot");

  const schoolCallInfo = {
    schoolName: data.schoolName,
    schoolNumber: data.schoolNumber
  };

  const openCallPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <CallSchoolBottomSheet info={schoolCallInfo} isOpen={isOpen} close={close} />
    ));

  const tickeyRemainingDays = remainingDays(
    data.ticket.ticketStartDate,
    data.ticket.monthlyTicketNumber
  );

  const openDisconnectPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <BasicModal
        isOpen={isOpen}
        close={close}
        actionFn={() => {
          close();
          handleDeleteSchool();
        }}
        title="유치원과 연결을 끊으시겠습니까?"
        closeText="취소"
        actionText="연결 끊기"
        colorScheme="red"
      >
        지금까지 주고 받은 채팅내역, 알림장, 사진앨범 등의
        <em className="emphasisText">모든 기록은 유지</em>되지만, 유치원과 연결이 끊겨 더 이상 해당
        유치원의 소식을 받을 수 없어요
      </BasicModal>
    ));

  const openAlertPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <AlertBottomSheet
        title="이용권의 사용기한이 남아 있어요"
        subtitle="유치원과의 연결을 끊으면 서비스 이용이 불가능해요 아직 이용권의 사용기한이 남아 있어요 그래도 연결을 끊으시겠습니까?"
        isOpen={isOpen}
        close={close}
        actionText={"연결 끊기"}
        actionFn={() => {
          close();
          handleDeleteSchool();
        }}
      />
    ));

  const handleDeleteSchool = () => {
    mutateMemberDogSchoolDelete(dogId, {
      onSuccess: () => {
        navigate(-1);
        showToast("유치원과 연결이 끊어졌습니다", "bottom");
      }
    });
  };

  const ticketInfo = (ticketType: string) => {
    const monthlyTicketRemainingDays = remainingDays(
      data.ticket.ticketStartDate,
      data.ticket.monthlyTicketNumber
    );

    switch (ticketType) {
      case "ROUND":
        return `회차권_${data.ticket.allRoundTicket}회 (잔여 ${data.ticket.currentRoundTicket}회)`;
      case "MONTHLY":
        return `정기권_${data.ticket.monthlyTicketNumber}주 (${
          monthlyTicketRemainingDays > 0 ? `만료 ${monthlyTicketRemainingDays}일 전` : `만료`
        })`;
    }
  };

  return (
    <S.CardContainer>
      <S.CardBox>
        <S.CardTitle>{`${schoolCallInfo.schoolName ?? ""}`} 유치원</S.CardTitle>
        <S.InfoContainer>
          <S.InfoList>
            <S.IconWrapper>
              <Phone />
            </S.IconWrapper>
            <S.ListTitle>{schoolCallInfo.schoolNumber ?? ""}</S.ListTitle>
            <S.YellowThickButton onClick={openCallPopup}>
              <PhoneIcon />
              전화 걸기
            </S.YellowThickButton>
          </S.InfoList>
          <S.InfoList>
            <S.IconWrapper>
              <List />
            </S.IconWrapper>
            <S.ListTitle>이용권 : {ticketInfo(data.ticket.ticketType) ?? ""}</S.ListTitle>
          </S.InfoList>
          <S.InfoList>
            <S.IconWrapper>
              <Map />
            </S.IconWrapper>
            <S.ListTitle>{`${data.schoolAddress ?? ""} ${data.schoolAddressDetail ?? ""}`}</S.ListTitle>
          </S.InfoList>
          <S.InfoList>
            <S.IconWrapper>
              <Calendar />
            </S.IconWrapper>
            <S.ListTitle>{registeredTime ?? ""} 등록</S.ListTitle>
          </S.InfoList>
        </S.InfoContainer>
        <WideButton
          mt={8}
          colorScheme="gray_4"
          onClick={
            tickeyRemainingDays > 0 || data.ticket.currentRoundTicket > 0
              ? openAlertPopup
              : openDisconnectPopup
          }
        >
          유치원 연결 끊기
        </WideButton>
      </S.CardBox>
    </S.CardContainer>
  );
};

export default SchoolInfo;
