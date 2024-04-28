import MoreIcon from "assets/svg/more-icon";
import SendAlarmIcon from "assets/svg/send-alarm";
import XCircleIcon from "assets/svg/x-circle-icon";
import { Dropdown } from "components/common";
import SimpleButton from "components/common/Button/SimpleButton";

interface CareOptionListProps {
  options: string[];
  handleOptionClick: (option: string) => void;
}

const CareOptionDropdown = ({ options, handleOptionClick }: CareOptionListProps) => {
  const optionIcon = {
    "관리 강아지 삭제": <XCircleIcon colorScheme="brown" />,
    "알림장 일괄 전송": <SendAlarmIcon />
  };

  return (
    <Dropdown>
      <Dropdown.Content>
        <Dropdown.Trigger>
          <SimpleButton ph={0.125}>
            <MoreIcon />
          </SimpleButton>
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

export default CareOptionDropdown;
