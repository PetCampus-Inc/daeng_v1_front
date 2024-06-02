import { Dropdown } from "components/common";

import SaveButton from "./SaveButton";
import { DropdownListStyle } from "./styles";

interface SaveOptionProps {
  option: { label: string; icon: JSX.Element; onClick: () => void }[];
}

const SaveOptionDropdown = ({ option }: SaveOptionProps) => {
  return (
    <Dropdown customStyle={"width: max-content"}>
      <Dropdown.Content>
        <Dropdown.Trigger>
          <SaveButton />
        </Dropdown.Trigger>
        <Dropdown.List customStyle={DropdownListStyle}>
          {option.map((opt, idx) => (
            <Dropdown.Option key={idx} onClick={opt.onClick}>
              {opt.icon}
              <span>{opt.label}</span>
            </Dropdown.Option>
          ))}
        </Dropdown.List>
      </Dropdown.Content>
    </Dropdown>
  );
};

export default SaveOptionDropdown;
