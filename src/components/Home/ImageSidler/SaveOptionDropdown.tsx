import MultiplePhotoSaveIcon from "assets/svg/multiple-photo-save-icon";
import PhotoSaveIcon from "assets/svg/photo-save-icon";
import { Dropdown } from "components/common";

import SaveButton from "./SaveButton";
import { DropdownListStyle, IconWrapper } from "./styles";

interface SaveOption {
  label: string;
  icon: JSX.Element;
  onClick: (url: string) => void;
}

const SaveOptionDropdown = () => {
  const saveOptions: SaveOption[] = [
    {
      label: "이 사진만 저장",
      icon: (
        <IconWrapper>
          <PhotoSaveIcon />
        </IconWrapper>
      ),
      onClick: (imageUrl) => {
        console.log(`Saved image URL: ${imageUrl}`);
      }
    },
    {
      label: "전체 저장",
      icon: (
        <IconWrapper>
          <MultiplePhotoSaveIcon />
        </IconWrapper>
      ),
      onClick: (imageUrl) => {
        console.log(`Saved image URL: ${imageUrl}`);
      }
    }
  ];

  return (
    <Dropdown customStyle={"width: max-content"}>
      <Dropdown.Content>
        <Dropdown.Trigger>
          <SaveButton />
        </Dropdown.Trigger>
        <Dropdown.List customStyle={DropdownListStyle}>
          {saveOptions.map((option, index) => (
            <Dropdown.Option key={index} onClick={() => console.log("클릭!")}>
              {option.icon}
              <span>{option.label}</span>
            </Dropdown.Option>
          ))}
        </Dropdown.List>
      </Dropdown.Content>
    </Dropdown>
  );
};

export default SaveOptionDropdown;
