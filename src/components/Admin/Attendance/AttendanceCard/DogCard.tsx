import { PATH } from "constants/path";

import AlertSmallIcon from "assets/svg/alert-small-icon";
import CalendarIcon from "assets/svg/calendar";
import { useDeleteAttendDog } from "hooks/api/admin/attendance";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useOverlay } from "hooks/common/useOverlay";
import { Suspense, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AdminRole } from "types/common/role.types";
import { addZero } from "utils/date";
import { checkMonthlyTicketStatus, checkRoundTicketStatus } from "utils/remainingDays";

import * as S from "./styles";
import AttendanceOptionList from "../AttendanceButton/AttendanceOptionList";
import CallMemberBottomSheet from "../AttendanceModal/CallMemberBottomSheet";
import DeleteDogModal from "../AttendanceModal/DeleteDogModal";

import type { AttendanceData } from "types/admin/attendance.type";

type DogCardProps = { info: AttendanceData };

const DogCard = memo(({ info }: DogCardProps) => {
  const overlay = useOverlay();
  const monthlyTicketDate = addZero(info.monthlyTicket || []);
  const {
    isExpired: isRoundExpired,
    isExpiringSoon: isRoundExpiringSoon,
    isValid: isRoundValid
  } = checkRoundTicketStatus(info.currentRounds || 0);
  const {
    isExpired: isMonthlyExpired,
    isExpiringSoon: isMonthlyExpiringSoon,
    isValid: isMonthlyValid
  } = checkMonthlyTicketStatus(info.monthlyTicket || []);

  const { mutateDelete } = useDeleteAttendDog();
  const navigate = useNavigate();
  const { role: adminRole } = useAdminInfo();

  const openCallPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <Suspense>
        <CallMemberBottomSheet isOpen={isOpen} close={close} dogId={info.dogId} />
      </Suspense>
    ));

  const openDeleteModal = () =>
    overlay.open(({ isOpen, close }) => (
      <DeleteDogModal isOpen={isOpen} close={close} action={handleDeleteDog} />
    ));

  // FIXME: 실제 전화번호 앱 열리는 로직 추가 필요
  const handleGetCallInfo = async () => {
    openCallPopup();
  };

  // FIXME: 실제 알림 전송 로직 추가 필요
  const handlerSendAlarm = async () => {
    console.log(info.dogId);
  };

  const handleDeleteDog = () => {
    mutateDelete(info.dogId, {
      onSuccess: () => overlay.close()
    });
  };

  const actionHandlers: { [key: string]: () => void | Promise<void> } = {
    "견주에게 전화 걸기": () => handleGetCallInfo(),
    "이용권 알림 전송하기": () => handlerSendAlarm(),
    "강아지 삭제": openDeleteModal
  };

  const handleOptionClick = (option: string) => {
    const action = actionHandlers[option];
    if (action) action();
  };

  const OPTIONS = useMemo(() => {
    return getOptions(isRoundExpiringSoon, isMonthlyExpiringSoon, adminRole)
      .filter((option) => option.condition())
      .map((option) => option.label);
  }, [isRoundExpiringSoon, isMonthlyExpiringSoon, adminRole]);

  const params = new URLSearchParams();
  params.append("dog_name", info.dogName);
  params.append(
    "ticket_status",
    (isRoundExpired || isRoundExpiringSoon || isMonthlyExpired || isMonthlyExpiringSoon).toString()
  );

  return (
    <S.CardContainer
      onClick={() => navigate(PATH.ADMIN_ATTENDANCE_INFO(`${info.dogId}?${params}`))}
    >
      <S.ImageWrapper className={isRoundExpired || isMonthlyExpired ? "expired" : ""}>
        <S.Image
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={info.dogName + "의 프로필 사진"}
        />
      </S.ImageWrapper>
      <S.InfoWrapper className={isRoundExpired || isMonthlyExpired ? "expired" : ""}>
        <S.StyledText className="dogName">{info.dogName}</S.StyledText>
        <S.Info $isBeforeExpiry={isRoundExpiringSoon || isMonthlyExpiringSoon}>
          <S.Icon>
            {(isRoundExpiringSoon || isMonthlyExpiringSoon) && <AlertSmallIcon color="brown" />}
            {(isRoundExpired || isMonthlyExpired) && <AlertSmallIcon color="gray" />}
            {(isRoundValid || isMonthlyValid) && <CalendarIcon className="calendar-icon" />}
          </S.Icon>
          <span className="ticketNumber">
            {isRoundValid && isMonthlyValid
              ? `${monthlyTicketDate} 만료`
              : `잔여 ${info.currentRounds}/${info.allRounds} 회`}
          </span>
        </S.Info>
      </S.InfoWrapper>
      {adminRole && (
        <AttendanceOptionList options={OPTIONS} handleOptionClick={handleOptionClick} />
      )}
    </S.CardContainer>
  );
});

export default DogCard;

// 드롭다운 메뉴
const getOptions = (
  isRoundExpiringSoon: boolean,
  isMonthlyExpiringSoon: boolean,
  adminRole: string
) => [
  {
    label: "견주에게 전화 걸기",
    condition: () => true
  },
  {
    label: "이용권 알림 전송하기",
    condition: () => isRoundExpiringSoon || isMonthlyExpiringSoon
  },
  {
    label: "강아지 삭제",
    condition: () => adminRole === AdminRole.ROLE_OWNER
  }
];
