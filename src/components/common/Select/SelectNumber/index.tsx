import { useRef } from "react";
import { ThemeConfig } from "styles/ThemeConfig";
import {
  StyledButtonWrapper,
  StyledMainWrapper,
  StyledWrapper
} from "components/common/InputBox/styles";
import useDetectClose from "hooks/common/useDetectClose";
import { FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import StringDropdown from "components/common/Dropdown/StringDropdown";
import { IoIosArrowDown } from "react-icons/io";

interface ISelectNumber {
  numberList: string[];
  initialValue: string;
  width?: string;
  name: string;
  register?: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const SelectNumber = ({
  name,
  numberList,
  initialValue,
  register,
  watch,
  setValue,
  width = "100%",
  ...props
}: ISelectNumber) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const value = watch(`${name}`) ? watch(`${name}`) : initialValue;

  return (
    <div ref={dropDownRef} style={{ position: "relative" }}>
      <StyledMainWrapper width={width} height="49px">
        <StyledWrapper
          readOnly
          value={value}
          color={ThemeConfig.colors.gray_2}
          border={`1px solid ${ThemeConfig.colors.gray_4}`}
          {...(name && register && register(name))}
          {...props}
        />
        <StyledButtonWrapper onClick={() => setIsOpen(!isOpen)}>
          <IoIosArrowDown />
        </StyledButtonWrapper>
      </StyledMainWrapper>
      {isOpen && (
        <StringDropdown
          dropDownList={numberList}
          setIsOpen={setIsOpen}
          name={name}
          value={value}
          setValue={setValue}
          width={width}
        />
      )}
    </div>
  );
};

export default SelectNumber;
