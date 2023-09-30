import { memo } from "react";
import { StyledWrapper } from "./styles";

interface Props {
  width: string;
  height: string;
  placeholdText?: string;
  type?: string;
}

const InputBox = ({ width, height, placeholdText, type }: Props) => {
  return (
    <StyledWrapper
      width={width}
      height={height}
      placeholder={placeholdText}
      type={type}
    />
  );
};

export default memo(InputBox);
