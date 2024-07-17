import type { PropsWithChildren } from "react";

import { ColorProps, SpacingProps } from "styles/system";

import { StyledContainer } from "./styles";

/**
 * type: global - App에서 사용
 * type: main - 메인 페이지에서 사용 (with NavBar)
 * type: detail - 상세 페이지에서 사용 (without NavBar)
 */
export interface LayoutProps extends ColorProps, SpacingProps {
  type?: "global" | "main" | "detail";
}

export const Layout = ({ type = "detail", children, ...props }: PropsWithChildren<LayoutProps>) => {
  return (
    <StyledContainer type={type} {...props}>
      {children}
    </StyledContainer>
  );
};
