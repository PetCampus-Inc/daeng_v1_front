import { memo } from "react";
import { StyledMainWrapper } from "./styles";

interface Props {
  height: string;
  width: string;
  text?: string;
  textcolor?: string;
  backcolor?: string;
  handleClick?: () => void | Promise<void>;
  border?: string;
  radius?: string;
  weight?: string;
  size?: string;
  marginbottom?: string;
  children?: React.ReactNode;
}

const Button = ({
  height,
  width,
  text,
  textcolor,
  backcolor,
  handleClick,
  border,
  radius,
  weight,
  size,
  marginbottom,
  children,
}: Props) => {
  return (
    <StyledMainWrapper
      height={height}
      width={width}
      textcolor={textcolor}
      backcolor={backcolor}
      onClick={handleClick}
      border={border}
      radius={radius}
      weight={weight}
      size={size}
      marginbottom={marginbottom}
    >
      {children}
      {text}
    </StyledMainWrapper>
  );
};

export default memo(Button);
