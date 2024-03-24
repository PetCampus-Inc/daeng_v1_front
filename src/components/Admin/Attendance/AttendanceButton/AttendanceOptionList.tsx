import MoreIcon from "assets/svg/more-icon";
import PhoneIcon from "assets/svg/phone";
import SendAlarmIcon from "assets/svg/send-alarm";
import XBoxIcon from "assets/svg/x-box";
import Dropdown from "components/common/Dropdown/OptionDropdown";

import { IconWrapper } from "./styles";
interface Props {
  options: string[];
  handleOptionClick: (option: string) => void;
}
const AttendanceOptionList = ({ options, handleOptionClick }: Props) => {
  const optionIcon = {
    "견주에게 전화 걸기": <PhoneIcon />,
    "이용권 알림 전송하기": <SendAlarmIcon />,
    "강아지 삭제": <XBoxIcon />
  };

  return (
    <Dropdown defaultOpen={false}>
      <Dropdown.Trigger>
        <IconWrapper>
          <MoreIcon />
        </IconWrapper>
      </Dropdown.Trigger>
      <Dropdown.List>
        {options.map((option, index) => (
          <Dropdown.Option
            key={index}
            onClick={(e) => {
              e?.stopPropagation();
              handleOptionClick(option);
            }}
          >
            {optionIcon[option as keyof typeof optionIcon]}
            <span>{option}</span>
          </Dropdown.Option>
        ))}
      </Dropdown.List>
    </Dropdown>
  );
};

export default AttendanceOptionList;