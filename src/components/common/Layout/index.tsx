import type { PropsWithChildren } from "react";

import { StyledContainer } from "./styles";
import { ColorProps, SpacingProps } from "../style-props.types";

export interface LayoutProps extends ColorProps, Pick<SpacingProps, "px" | "paddingX"> {
  type?: "global" | "page";
}

export const Layout = ({ type = "page", children, ...props }: PropsWithChildren<LayoutProps>) => {
  return (
    <StyledContainer type={type} {...props}>
      {children}
    </StyledContainer>
  );
};
