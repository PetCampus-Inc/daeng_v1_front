import MultiplePhotoSaveIcon from "assets/svg/multiple-photo-save-icon";
import PhotoSaveIcon from "assets/svg/photo-save-icon";
import Dropdown from "components/common/Dropdown/OptionDropdown/DropdownRoot";

import SaveButton from "./SaveButton";
import { DropdownListStyle, IconWrapper } from "./style";

interface OptionListProps {
  options: string[];
  handleOptionClick: (option: string) => void;
}

const SaveOptionDropdown = ({ options, handleOptionClick }: OptionListProps) => {
  const optionIcon = {
    "이 사진만 저장": (
      <IconWrapper>
        <PhotoSaveIcon />
      </IconWrapper>
    ),
    "전체 저장": (
      <IconWrapper>
        <MultiplePhotoSaveIcon />
      </IconWrapper>
    )
  };

  return (
    <Dropdown customStyle={"width: max-content"}>
      <Dropdown.Content>
        <Dropdown.Trigger>
          <SaveButton />
        </Dropdown.Trigger>
        <Dropdown.List customStyle={DropdownListStyle}>
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

export default SaveOptionDropdown;
