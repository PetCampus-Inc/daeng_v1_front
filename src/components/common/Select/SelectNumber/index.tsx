import { useRef } from "react";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import useDetectClose from "hooks/common/useDetectClose";

import StringDropdown from "components/common/Dropdown/StringDropdown";
import InputField, { InputFieldProps } from "components/common/InputField";

import ArrowDownIcon from "assets/svg/arrow-down-icon";
import { Container, InputWrapper, Button } from "./styles";

interface ISelectNumber extends InputFieldProps {
  numberList?: string[];
  name: string;
  watch?: UseFormWatch<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  disabled?: boolean;
  defaultValue: string;
}

const SelectNumber = ({
  name,
  numberList,
  defaultValue,
  watch,
  setValue,
  disabled = false,
  ...props
}: ISelectNumber) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const value = watch?.(name) ?? defaultValue;

  return (
    <Container ref={dropDownRef}>
      <InputWrapper onClick={() => setIsOpen(!isOpen)}>
        <InputField
          {...props}
          name={name}
          disabled={disabled}
          defaultValue={defaultValue}
          readOnly
        />
        <Button disabled={disabled}>
          <ArrowDownIcon />
        </Button>
      </InputWrapper>
      {isOpen && numberList && setValue && (
        <StringDropdown
          dropDownList={numberList}
          setIsOpen={setIsOpen}
          name={name}
          setValue={setValue}
          value={value}
        />
      )}
    </Container>
  );
};

export default SelectNumber;
