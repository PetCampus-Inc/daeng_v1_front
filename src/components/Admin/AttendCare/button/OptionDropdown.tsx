import MoreIcon from "assets/svg/more-icon";
import SendAlarmIcon from "assets/svg/send-alarm";
import XCircleIcon from "assets/svg/x-circle-icon";
import { Dropdown } from "components/common";
import { Button } from "components/common/Button";

interface CareOptionListProps {
  options: string[];
  handleOptionClick: (option: string) => void;
}

const OptionDropdown = ({ options, handleOptionClick }: CareOptionListProps) => {
  const optionIcon = {
    "관리 강아지 삭제": <XCircleIcon colorScheme="brown" />,
    "알림장 일괄 전송": <SendAlarmIcon />
  };

  return (
    <Dropdown>
      <Dropdown.Content>
        <Dropdown.Trigger>
          <Button colorScheme="br_4" paddingInline={2}>
            <MoreIcon />
          </Button>
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

export default OptionDropdown;
