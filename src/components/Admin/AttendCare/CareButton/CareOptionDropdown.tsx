import MoreIcon from "assets/svg/more-icon";
import SendAlarmIcon from "assets/svg/send-alarm";
import XBoxIcon from "assets/svg/x-box";
import SimpleButton from "components/common/Button/SimpleButton";
import Dropdown from "components/common/Dropdown/OptionDropdown/Dropdown";

interface CareOptionListProps {
  options: string[];
  handleOptionClick: (option: string) => void;
}

const CareOptionDropdown = ({ options, handleOptionClick }: CareOptionListProps) => {
  const optionIcon = {
    "관리 강아지 삭제": <XBoxIcon />,
    "알림장 일괄 전송": <SendAlarmIcon />
  };

  return (
    <Dropdown defaultOpen={false}>
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
    </Dropdown>
  );
};

export default CareOptionDropdown;
