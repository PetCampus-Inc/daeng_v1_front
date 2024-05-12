import ArrowDownIcon from "assets/svg/arrow-down-icon";
import { TextInput } from "components/common";
import StringDropdown from "components/common/Dropdown";
import { type InputFieldProps } from "components/common/Input/TextInputField";
import { useClickOutSide } from "hooks/common/useClickOutSide";
import { useRef, useState } from "react";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";

import { Container, InputWrapper, Button } from "./styles";

interface ISelectNumber extends InputFieldProps {
  numberList?: string[];
  name: string;
  watch?: UseFormWatch<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  disabled?: boolean;
  defaultValue?: string;
  placeholder?: string;
}

const SelectNumber = ({
  name,
  numberList,
  defaultValue,
  watch,
  setValue,
  disabled = false,
  placeholder,
  ...props
}: ISelectNumber) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, isSetDropdownOpen] = useState<boolean>(false);

  const value = watch?.(name) ?? defaultValue;

  // dropdown 열기/닫기 관리
  useClickOutSide({
    enabled: isDropdownOpen,
    targetRef: dropDownRef,
    onClickOutside: () => isSetDropdownOpen(false)
  });

  return (
    <Container ref={dropDownRef}>
      <InputWrapper onClick={() => isSetDropdownOpen(!isDropdownOpen)}>
        <TextInput
          {...props}
          name={name}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          readOnly
        />
        <Button disabled={disabled}>
          <ArrowDownIcon />
        </Button>
      </InputWrapper>
      {isDropdownOpen && numberList && setValue && (
        <StringDropdown
          dropDownList={numberList}
          setIsOpen={isSetDropdownOpen}
          name={name}
          setValue={setValue}
          value={value}
        />
      )}
    </Container>
  );
};

export default SelectNumber;
