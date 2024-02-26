import { StyledOptionList, StyledButtonWrapper, Item } from "../DogCard/styles";
import PhoneIcon from "assets/svg/phone";
import SendAlarmIcon from "assets/svg/send-alarm";
import XBoxIcon from "assets/svg/x-box";

interface Props {
  isOptionsOpen: boolean;
  options: string[];
  handleOptionClick: (option: string) => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

const AttendanceOptionList = ({ isOptionsOpen, options, handleOptionClick, modalRef }: Props) => {
  return (
    <>
      <StyledOptionList className="dropdown" isOpen={isOptionsOpen} ref={modalRef}>
        {options.map((option, index) => (
          <StyledButtonWrapper key={index}>
            <Item
              onClick={(e) => {
                e.preventDefault();
                handleOptionClick(option);
              }}
            >
              {option === "견주에게 전화 걸기" && <PhoneIcon />}
              {option === "이용권 알림 전송하기" && <SendAlarmIcon />}
              {option === "강아지 삭제" && <XBoxIcon />}
              {option}
            </Item>
          </StyledButtonWrapper>
        ))}
      </StyledOptionList>
    </>
  );
};

export default AttendanceOptionList;
