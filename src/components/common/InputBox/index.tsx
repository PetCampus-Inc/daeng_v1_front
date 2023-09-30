import { memo, SetStateAction } from "react";
import { StyledWrapper } from "./styles";

interface Props {
  width: string;
  height: string;
  placeholdText?: string;
  inputValue: any;
  setInputValue: (e: any) => void | SetStateAction<any>;
  type?: string;
}

const InputBox = ({
  width,
  height,
  placeholdText,
  inputValue,
  setInputValue,
  type,
}: Props) => {
  return (
    <StyledWrapper
      width={width}
      height={height}
      placeholder={placeholdText}
      type={type}
      value={inputValue}
      onChange={setInputValue}
    />
  );
};

export default memo(InputBox);
