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
  margintop?: string;
  children?: React.ReactNode;
  classname?: string;
  display?: string;
}

const ReverseButton = ({
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
  margintop,
  children,
  classname,
  display,
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
      margintop={margintop}
      marginbottom={marginbottom}
      display={display}
    >
      {text}
      {children}
    </StyledMainWrapper>
  );
};

export default memo(ReverseButton);
