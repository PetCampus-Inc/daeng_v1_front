import { useRef, useState } from "react";
import { ThemeConfig } from "styles/ThemeConfig";
import DropDown from "components/common/Dropdown";
import {
  StyledButtonWrapper,
  StyledMainWrapper,
  StyledWrapper
} from "components/common/InputBox/styles";
import useDetectClose from "hooks/common/useDetectClose";
import { IoIosArrowDown } from "react-icons/io";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface ISelectNumber {
  numberList: string[];
  initialValue: string;
  placeHolder?: string;
  width?: string;
  name?: string;
  register?: UseFormRegister<FieldValues>;
}

const SelectNumber = ({
  numberList,
  initialValue,
  placeHolder,
  width = "100%",
  name,
  register,
  ...props
}: ISelectNumber) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const [inputValue, setInputValue] = useState<string>(initialValue);

  return (
    <div ref={dropDownRef} style={{ position: "relative" }}>
      <StyledMainWrapper width={width} height="49px">
        <StyledWrapper
          readOnly
          value={inputValue}
          color={ThemeConfig.colors.gray_2}
          placeholder={placeHolder}
          border={`1px solid ${ThemeConfig.colors.gray_4}`}
          {...(name && register && register(name))}
          {...props}
        />
        <StyledButtonWrapper onClick={() => setIsOpen(!isOpen)}>
          <IoIosArrowDown />
        </StyledButtonWrapper>
      </StyledMainWrapper>
      {isOpen && (
        <DropDown
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          inputValue={inputValue}
          dropDownList={numberList}
          width={width}
          setInputValue={setInputValue}
        />
      )}
    </div>
  );
};

export default SelectNumber;
