import { StyledOptionList, StyledButtonWrapper } from "./styles";
import Button from "components/common/Button";
import { ThemeConfig } from "styles/ThemeConfig";
import PhoneIcon from "assets/svg/phone";
import SendAlarmIcon from "assets/svg/send-alarm";
import XBoxIcon from "assets/svg/x-box";

interface Props {
  isOptionsOpen: boolean;
  options: string[];
  handleOptionClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, option: string) => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

const OptionList = ({ isOptionsOpen, options, handleOptionClick, modalRef }: Props) => {
  return (
    <>
      <StyledOptionList isopen={isOptionsOpen.toString()} ref={modalRef}>
        {options.map((option, index) => (
          <StyledButtonWrapper key={index}>
            <Button
              width="100%"
              height="100%"
              text={option}
              size="0.9rem"
              justify="flex-start"
              backcolor={ThemeConfig.colors.white}
              textcolor={ThemeConfig.colors.gray_2}
              handleClick={(e) => {
                handleOptionClick(e, option);
              }}
            >
              {option === "견주에게 전화 걸기" && <PhoneIcon />}
              {option === "이용권 알림 전송하기" && <SendAlarmIcon />}
              {option === "강아지 삭제" && <XBoxIcon />}
            </Button>
          </StyledButtonWrapper>
        ))}
      </StyledOptionList>
    </>
  );
};

export default OptionList;
