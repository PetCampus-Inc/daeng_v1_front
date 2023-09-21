import { memo } from "react";
import { StyledMainWrapper } from "./styles";

interface Props {
  height: string;
  width: string;
  text?: string;
  textColor?: string;
  backColor?: string;
  handleClick?: () => void | Promise<void>;
  radius?: string;
  weight?: string;
  size?: string;
}

const Button = ({
  height,
  width,
  text,
  textColor,
  backColor,
  handleClick,
  radius,
  weight,
  size,
}: Props) => {
  return (
    <StyledMainWrapper
      height={height}
      width={width}
      textColor={textColor}
      backColor={backColor}
      onClick={handleClick}
      radius={radius}
      weight={weight}
      size={size}
    >
      {text}
    </StyledMainWrapper>
  );
};

export default memo(Button);
