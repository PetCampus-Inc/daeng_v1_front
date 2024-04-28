import MoreIcon from "assets/svg/more-icon";
import PhoneIcon from "assets/svg/phone-icon";
import SendAlarmIcon from "assets/svg/send-alarm";
import XCircleIcon from "assets/svg/x-circle-icon";
import Dropdown from "components/common/Dropdown/OptionDropdown/Dropdown";

import { IconWrapper } from "./styles";
interface Props {
  options: string[];
  handleOptionClick: (option: string) => void;
}
const AttendanceOptionList = ({ options, handleOptionClick }: Props) => {
  const optionIcon = {
    "견주에게 전화 걸기": <PhoneIcon />,
    "이용권 알림 전송하기": <SendAlarmIcon />,
    "강아지 삭제": <XCircleIcon colorScheme="brown" />
  };

  return (
    <Dropdown>
      <Dropdown.Content>
        <Dropdown.Trigger>
          <IconWrapper>
            <MoreIcon />
          </IconWrapper>
        </Dropdown.Trigger>
        <Dropdown.List>
          {options.map((option, index) => (
            <Dropdown.Option
              key={index}
              onClick={() => {
                handleOptionClick(option);
              }}
            >
              {optionIcon[option as keyof typeof optionIcon]}
              <span>{option}</span>
            </Dropdown.Option>
          ))}
        </Dropdown.List>
      </Dropdown.Content>
    </Dropdown>
  );
};

export default AttendanceOptionList;
