import {
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Container,
  StyledBlur,
  StyledImage,
  StyledOptionList,
  StyledTextWrapper,
  TextWrapper,
  StyledButtonWrapper,
} from "./styles";
import Text from "components/common/Text";
import { ThemeConfig } from "styles/ThemeConfig";
import Button from "components/common/Button";
import { handleCallMember, handleSendAlarm } from "apis/attendance";

interface Props {
  name?: string;
  dogId: number;
  allRounds?: number;
  currentRounds: number;
  className?: string;
  adminRole?: string;
  setIsCallModalOpen: Dispatch<SetStateAction<boolean>>;
  setMemberPhone: Dispatch<SetStateAction<string>>;
  setDogName: Dispatch<SetStateAction<string>>;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
}

const DogCard = ({
  name,
  dogId,
  allRounds,
  currentRounds,
  className,
  adminRole,
  setIsCallModalOpen,
  setMemberPhone,
  setDogName,
  setIsDeleteModalOpen,
}: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleGetCallInfo = async (dogId: number) => {
    try {
      const data = await handleCallMember(dogId);
      if (data.status === 200) {
        setMemberPhone(data.data.memberPhoneNumber);
        setDogName(data.data.dogName);
        setIsCallModalOpen(true);
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

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <Container>
      <StyledImage
        src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="dog-image"
      />
      <StyledTextWrapper>
        <Text
          text={name}
          color={
            currentRounds === 0 ? ThemeConfig.gray_2 : ThemeConfig.darkBlack
          }
          weight="800"
        />
        <TextWrapper>
          <StyledBlur display={currentRounds === 0 ? "block" : "none"} />
          <StyledImage
            src={
              currentRounds === 1 || currentRounds === 2
                ? "/images/alert-brown.png"
                : currentRounds === 0
                ? "/images/gray-calendar.png"
                : "/images/calendar.png"
            }
            alt="more-button"
            width="1.1rem"
            height="1.1rem"
            marginright="0.1rem"
          />
          <Text
            text={`잔여 ${currentRounds}/${allRounds} 회`}
            color={
              currentRounds === 0
                ? ThemeConfig.gray_2
                : ThemeConfig.primaryColor
            }
            size="0.8rem"
            margintop="0.1rem"
          />
        </TextWrapper>
      </StyledTextWrapper>
      <StyledImage
        src="/images/more-button.png"
        alt="more-button"
        width="1.5rem"
        height="1.5rem"
        marginright="0"
        position="absolute"
        right="6px"
        top="3px"
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
      />
      {isOptionsOpen && adminRole === "ROLE_OWNER" && (
        <StyledOptionList isopen={isOptionsOpen.toString()} ref={modalRef}>
          {OPTIONS.owner.map((option, index) => (
            <StyledButtonWrapper key={index}>
              <Button
                width="100%"
                height="100%"
                text={option}
                size="0.9rem"
                justify="flex-start"
                backcolor={ThemeConfig.white}
                textcolor={ThemeConfig.gray_2}
                handleClick={() => {
                  option === "견주에게 연락하기" && handleGetCallInfo(dogId);
                  option === "회원권 알림 전송" && handlerSendAlarm(dogId);
                  option === "회원 삭제" && setIsDeleteModalOpen(true);
                }}
              >
                <StyledImage
                  src="/images/yellow-box.png"
                  alt="yellow-box"
                  radius="20%"
                  width="1.5rem"
                  height="1.5rem"
                />
              </Button>
            </StyledButtonWrapper>
          ))}
        </StyledOptionList>
      )}
      {isOptionsOpen && adminRole === "ROLE_TEACHER" && (
        <StyledOptionList isopen={isOptionsOpen.toString()} ref={modalRef}>
          {OPTIONS.teacher.map((option, index) => (
            <StyledButtonWrapper key={index}>
              <Button
                width="100%"
                height="100%"
                text={option}
                size="0.9rem"
                justify="flex-start"
                backcolor={ThemeConfig.white}
                textcolor={ThemeConfig.gray_2}
                handleClick={() => {
                  option === "견주에게 연락하기" && handleGetCallInfo(dogId);
                  option === "회원권 알림 전송" && handlerSendAlarm(dogId);
                }}
              >
                <StyledImage
                  src="/images/yellow-box.png"
                  alt="yellow-box"
                  radius="20%"
                  width="1.5rem"
                  height="1.5rem"
                />
              </Button>
            </StyledButtonWrapper>
          ))}
        </StyledOptionList>
      )}
    </Container>
  );
};

export default memo(DogCard);

const OPTIONS = {
  owner: ["견주에게 연락하기", "회원권 알림 전송", "회원 삭제"],
  teacher: ["견주에게 연락하기", "회원권 알림 전송"],
};
