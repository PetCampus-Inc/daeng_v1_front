import { Children, memo } from "react";
import { StyledMainWrapper } from "./styles";

interface Props {
  height: string;
  width: string;
  text?: string;
  textColor?: string;
  backColor?: string;
  handleClick?: () => void | Promise<void>;
  border?: string;
  radius?: string;
  weight?: string;
  size?: string;
  marginBottom?: string;
  children?: React.ReactNode;
}

const Button = ({
  height,
  width,
  text,
  textColor,
  backColor,
  handleClick,
  border,
  radius,
  weight,
  size,
  marginBottom,
  children,
}: Props) => {
  return (
    <StyledMainWrapper
      height={height}
      width={width}
      textColor={textColor}
      backColor={backColor}
      onClick={handleClick}
      border={border}
      radius={radius}
      weight={weight}
      size={size}
      marginBottom={marginBottom}
    >
      {children}
      {text}
    </StyledMainWrapper>
  );
};

export default memo(Button);
