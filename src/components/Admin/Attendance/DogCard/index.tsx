import { Dispatch, SetStateAction, memo, useEffect, useRef, useState } from "react";
import { Container, StyledBlur, StyledImage, StyledTextWrapper, TextWrapper } from "./styles";
import Text from "components/common/Text";
import { ThemeConfig } from "styles/ThemeConfig";
import { handleCallMember, handleSendAlarm } from "apis/attendance";
import GetExpirationDate from "hooks/common/useGetExpirationDate";
import useFormatDate from "hooks/common/useFormatDate";
import { useNavigate } from "react-router-dom";
import useGetDogDetail from "hooks/api/useGetDogDetail";
import moment from "moment";
import { PATH } from "constants/path";
import BrownAlertIcon from "assets/svg/alert-brown";
import GrayAlertIcon from "assets/svg/alert.gray";
import CalendarIcon from "assets/svg/calendar";
import OptionList from "./OptionList";

interface Props {
  name?: string;
  dogId: number;
  allRounds?: number;
  currentRounds?: number;
  monthlyTicket?: Array<number>;
  className?: string;
  adminRole?: string;
  attendanceId?: number;
  selectedDogIds?: number[];
  selectedCareDogId?: number[];
  setIsCallModalOpen?: Dispatch<SetStateAction<boolean>>;
  setMemberPhone?: Dispatch<SetStateAction<string>>;
  setDogName?: Dispatch<SetStateAction<string>>;
  setIsDeleteModalOpen?: Dispatch<SetStateAction<boolean>>;
  setTargetDogId?: Dispatch<SetStateAction<number>>;
  setSeletedDogIds?: Dispatch<SetStateAction<number[]>>;
  setSelectedCareDogId?: Dispatch<SetStateAction<number[]>>;
}

// **출석 완료된 강아지들 표시 수정 필요**
const DogCard = ({
  name,
  dogId,
  allRounds,
  currentRounds,
  monthlyTicket,
  className,
  adminRole,
  attendanceId,
  setIsCallModalOpen,
  setMemberPhone,
  setDogName,
  setIsDeleteModalOpen,
  setTargetDogId,
  selectedDogIds,
  setSeletedDogIds,
  selectedCareDogId,
  setSelectedCareDogId
}: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { isBeforeExpiry, isExpired } = GetExpirationDate(monthlyTicket || []);
  const monthlyTicketDate = useFormatDate(monthlyTicket || []);
  const navigate = useNavigate();
  const { handlerGetDogDetail } = useGetDogDetail();
  const date = moment(new Date()).format("YYYY-MM-DD");

  const handleCheckAttend = (attendanceId: number) => {
    if (selectedDogIds?.includes(attendanceId)) {
      setSeletedDogIds?.(selectedDogIds.filter((id) => id !== attendanceId));
    } else {
      setSeletedDogIds?.([...(selectedDogIds || []), attendanceId]);
    }
  };

  const handleAddAttend = (attendanceId: number) => {
    if (selectedCareDogId?.includes(attendanceId)) {
      setSelectedCareDogId?.(selectedCareDogId.filter((id) => id !== attendanceId));
    } else {
      setSelectedCareDogId?.([...(selectedCareDogId || []), attendanceId]);
    }
  };

  //////// 전화 걸 수 있는 기능 추가 필요함!
  const handleGetCallInfo = async (dogId: number) => {
    try {
      const data = await handleCallMember(dogId);
      if (data.status === 200) {
        setMemberPhone?.(data.data.memberPhoneNumber);
        setDogName?.(data.data.dogName);
        setIsCallModalOpen?.(true);
      }
    } catch (error) {
      return alert("해당 정보가 존재하지 않습니다.");
    }
  };

  ////////// 실제 어플 알림 전송 기능 추가필요함!!!
  const handlerSendAlarm = async (dogId: number) => {
    try {
      const data = await handleSendAlarm(dogId);
      if (data.status === 200) {
        return alert(`${name}의 회원권 알림이 전송되었습니다.`);
      }
    } catch (error) {
      return alert("회원권 알림 전송에 실패하였습니다.");
    }
  };

  const handleDeleteDog = (dogId: number) => {
    setTargetDogId?.(dogId);
    setIsDeleteModalOpen?.(true);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (className === "CARE") {
      handleAddAttend(attendanceId || -1);
    }
    if ((e.target as HTMLElement).tagName !== "StyledImage") {
      handlerGetDogDetail(dogId);
      navigate(PATH.ADMIN_DOG_INFO);
    }
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, option: string) => {
    e.stopPropagation();
    option === "견주에게 전화 걸기" && handleGetCallInfo(dogId);
    option === "이용권 알림 전송하기" && handlerSendAlarm(dogId);
    option === "강아지 삭제" && handleDeleteDog(dogId);
  };

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <Container
      onClick={className === "MODE" ? undefined : handleCardClick}
      backcolor={
        selectedCareDogId?.includes(attendanceId || -1)
          ? `${ThemeConfig.colors.br_4}`
          : `${ThemeConfig.colors.white}`
      }
    >
      <StyledImage
        src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="dog-image"
      />
      <StyledTextWrapper>
        {className === "MODE" || className === "CARE" ? (
          <Text text={name} weight="700" color={ThemeConfig.colors.darkBlack} />
        ) : (
          <>
            <Text
              text={name}
              color={
                (currentRounds === 0 && monthlyTicket === null) ||
                (currentRounds === 0 && isExpired)
                  ? ThemeConfig.colors.gray_2
                  : ThemeConfig.colors.darkBlack
              }
              weight="700"
            />
            <TextWrapper>
              <StyledBlur
                display={
                  (currentRounds === 0 && monthlyTicket === null) ||
                  (currentRounds === 0 && isExpired)
                    ? "block"
                    : "none"
                }
              />
              {currentRounds === 1 || currentRounds === 2 || (isBeforeExpiry && <BrownAlertIcon />)}
              {(currentRounds === 0 && monthlyTicket === null) ||
              (currentRounds === 0 && isExpired) ? (
                <GrayAlertIcon />
              ) : (
                <CalendarIcon />
              )}
              <Text
                text={
                  monthlyTicket !== null && !isExpired
                    ? `${monthlyTicketDate} 만료`
                    : `잔여 ${currentRounds}/${allRounds} 회`
                }
                color={
                  (currentRounds === 0 && monthlyTicket === null) ||
                  (currentRounds === 0 && isExpired)
                    ? ThemeConfig.colors.gray_2
                    : ThemeConfig.colors.primaryColor
                }
                size="0.8rem"
                margintop="0.1rem"
              />
            </TextWrapper>
          </>
        )}
      </StyledTextWrapper>
      {className === "MODE" ? (
        <StyledImage
          src={
            selectedDogIds?.includes(attendanceId || -1)
              ? "/images/default-foot-button.png"
              : "/images/active-foot-button.png"
          }
          alt="foot-icon"
          position="absolute"
          right="5px"
          onClick={() => {
            handleCheckAttend(attendanceId || -1);
          }}
        />
      ) : className !== "CARE" ? (
        <StyledImage
          src="/images/more-button.png"
          alt="more-button"
          width="1.5rem"
          height="1.5rem"
          marginright="0"
          position="absolute"
          right="6px"
          top="3px"
          onClick={(e) => {
            e.stopPropagation();
            setIsOptionsOpen(!isOptionsOpen);
          }}
        />
      ) : null}
      {isOptionsOpen && adminRole === "ROLE_OWNER" && (
        <OptionList
          isOptionsOpen={isOptionsOpen}
          options={OPTIONS.owner}
          handleOptionClick={handleOptionClick}
          modalRef={modalRef}
        />
      )}
      {isOptionsOpen && adminRole === "ROLE_TEACHER" && (
        <OptionList
          isOptionsOpen={isOptionsOpen}
          options={OPTIONS.owner}
          handleOptionClick={handleOptionClick}
          modalRef={modalRef}
        />
      )}
    </Container>
  );
};

export default memo(DogCard);

const OPTIONS = {
  owner: ["견주에게 전화 걸기", "이용권 알림 전송하기", "강아지 삭제"],
  teacher: ["견주에게 전화 걸기", "이용권 알림 전송하기"]
};
