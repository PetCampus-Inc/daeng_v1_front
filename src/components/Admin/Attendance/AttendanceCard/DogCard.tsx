import { PATH } from "constants/path";

import AlertSmallIcon from "assets/svg/alert-small-icon";
import CalendarIcon from "assets/svg/calendar";
import { useCallMember, useDeleteAttendDog } from "hooks/api/attendanceQuery";
import useBottomSheet from "hooks/common/useBottomSheet";
import useFormatDate from "hooks/common/useFormatDate";
import useModal from "hooks/common/useModal";
import { memo, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";
import { getOptions } from "utils/options";
import { checkMonthlyTicketStatus, checkRoundTicketStatus } from "utils/ticket";

import * as S from "./styles";
import AttendanceOptionList from "../AttendanceButton/AttendanceOptionList";
import CallMemberBottomSheet from "../AttendanceModal/CallMemberBottomSheet";
import DeleteDogModal from "../AttendanceModal/DeleteDogModal";

import type { IAttendDogInfo, IMemberCallInfo } from "types/admin.attendance.type";
import type { Nullable } from "types/helper.type";

type DogCardProps = { info: IAttendDogInfo };

const DogCard = memo(({ info }: DogCardProps) => {
  const monthlyTicketDate = useFormatDate(info.monthlyTicket || []);
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
  // const { isBeforeExpiry, isExpired } = GetExpirationDate(info.monthlyTicket || []);
  const { role: adminRole } = useRecoilValue(adminLoginInfoAtom);
  const { isVisible: isBsOpen, open: bsOpen, close: bsClose } = useBottomSheet();
  const { isVisible: isModalOpen, open: modalOpen, close: modalClose } = useModal();
  const [memberInfo, setMemberInfo] = useState<Nullable<IMemberCallInfo>>(null);
  const { refetch: getPhoneNumber } = useCallMember(info.dogId);
  const { mutateDelete } = useDeleteAttendDog();
  const navigate = useNavigate();

  // FIXME: 실제 전화번호 앱 열리는 로직 추가 필요
  const handleGetCallInfo = async () => {
    const { data } = await getPhoneNumber();
    if (!data) return;
    setMemberInfo(data);
    bsOpen();
  };

  // FIXME: 실제 알림 전송 로직 추가 필요
  const handlerSendAlarm = async () => {
    console.log(info.dogId);
  };

  const handleDeleteDog = () => {
    mutateDelete(info.dogId, {
      onSuccess: () => modalClose()
    });
  };

  const actionHandlers: { [key: string]: () => void | Promise<void> } = {
    "견주에게 전화 걸기": () => handleGetCallInfo(),
    "이용권 알림 전송하기": () => handlerSendAlarm(),
    "강아지 삭제": () => modalOpen()
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
    <>
      <CallMemberBottomSheet info={memberInfo} isOpen={isBsOpen} close={bsClose} />
      <DeleteDogModal isOpen={isModalOpen} close={modalClose} action={handleDeleteDog} />
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
          <S.Text className="dogName">{info.dogName}</S.Text>
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
    </>
  );
});

export default DogCard;
