import { useState } from "react";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";
import useModal from "hooks/common/useModal";
import useBottomSheet from "hooks/common/useBottomSheet";
import useFormatDate from "hooks/common/useFormatDate";
import GetExpirationDate from "hooks/common/useGetExpirationDate";
import useDropdown from "hooks/common/useDropdown";
import { useCallMember } from "hooks/api/useCallMemberQuery";
import { useDeleteDog } from "hooks/api/useDeleteDogMutation";
import { getOptions } from "utils/options";

import OptionList from "./OptionList";
import DeleteDogModal from "../AttendanceModal/DeleteDogModal";
import CallMemberBottomSheet from "../AttendanceModal/CallMemberBottomSheet";
import AlertSmallIcon from "assets/svg/alert-small-icon";
import CalendarIcon from "assets/svg/calendar";
import MoreIcon from "assets/svg/more-icon";
import type { IMemberCallInfo } from "types/Attendance.type";
import * as S from "./styles";

interface DogCardProps {
  dogId: number;
  name: string;
  allRounds: number | null;
  rounds: number | null;
  monthly: number[] | null;
}

const DogCard = ({ dogId, name, allRounds, rounds, monthly }: DogCardProps) => {
  const dropdown = useDropdown(dogId);
  const monthlyTicketDate = useFormatDate(monthly || []);
  const { isBeforeExpiry, isExpired } = GetExpirationDate(monthly || []);
  const { role: adminRole } = useRecoilValue(adminLoginInfoAtom).data;
  const { isVisible: isBsOpen, open: bsOpen, close: bsClose } = useBottomSheet();
  const { isVisible: isModalOpen, open: modalOpen, close: modalClose } = useModal();
  const { refetch: getPhoneNumber } = useCallMember(dogId);
  const { mutate } = useDeleteDog();
  const [memberInfo, setMemberInfo] = useState<IMemberCallInfo | null>(null);

  const handleGetCallInfo = async () => {
    const { data } = await getPhoneNumber();
    if (!data) return;
    setMemberInfo(data);
    bsOpen();
  };

  const handlerSendAlarm = async () => {
    console.log(dogId);
  };

  const handleDeleteDog = () => {
    mutate(dogId, {
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
    dropdown.toggle();
  };

  const OPTIONS = getOptions(rounds, isBeforeExpiry, adminRole)
    .filter((option) => option.condition())
    .map((option) => option.label);

  return (
    <>
      {isBsOpen && <CallMemberBottomSheet info={memberInfo} close={bsClose} />}
      {isModalOpen && (
        <DeleteDogModal isOpen={isModalOpen} close={modalClose} action={handleDeleteDog} />
      )}
      <S.CardContainer>
        <S.ImageWrapper>
          <S.Image
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={name + " 이미지"}
          />
        </S.ImageWrapper>
        <S.InfoWrapper>
          <S.Text>{name}</S.Text>
          <S.Info>
            <S.Icon $isExpired={isExpired}>
              {rounds === 1 || rounds === 2 || (isBeforeExpiry && <AlertSmallIcon color="brown" />)}
              {(rounds === 0 && rounds === null) || (rounds === 0 && isExpired) ? (
                <AlertSmallIcon color="gray" />
              ) : (
                <CalendarIcon className="calendar-icon" />
              )}
            </S.Icon>
            {monthly !== null && !isExpired
              ? `${monthlyTicketDate} 만료`
              : `잔여 ${rounds}/${allRounds} 회`}
          </S.Info>
        </S.InfoWrapper>
        <S.MoreButton
          type="button"
          className="more-button"
          onClick={(e) => {
            e.stopPropagation();
            dropdown.toggle();
          }}
        >
          {dropdown.isOpen && adminRole === "ROLE_OWNER" && (
            <OptionList
              isOptionsOpen={dropdown.isOpen}
              options={OPTIONS}
              handleOptionClick={handleOptionClick}
              modalRef={dropdown.ref}
            />
          )}
          {dropdown.isOpen && adminRole === "ROLE_TEACHER" && (
            <OptionList
              isOptionsOpen={dropdown.isOpen}
              options={OPTIONS}
              handleOptionClick={handleOptionClick}
              modalRef={dropdown.ref}
            />
          )}
          <MoreIcon />
        </S.MoreButton>
      </S.CardContainer>
    </>
  );
};

export default DogCard;
