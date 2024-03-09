import { memo } from "react";

import { StyledMainWrapper } from "./styles";

interface Props {
  height: string;
  width: string;
  text?: string;
  textcolor?: string;
  backcolor?: string;
  handleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void | Promise<void>;
  border?: string;
  radius?: string;
  weight?: string;
  size?: string;
  marginbottom?: string;
  margintop?: string;
  children?: React.ReactNode;
  classname?: string;
  justify?: string;
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
  margintop,
  children,
  justify,
  classname
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
      justify={justify}
      margintop={margintop}
      marginbottom={marginbottom}
    >
      {children}
      {text}
    </StyledMainWrapper>
  );
};

export default memo(Button);
