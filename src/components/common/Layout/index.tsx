import type { PropsWithChildren } from "react";

import { StyledContainer } from "./styles";

import type { ColorProps, SpacingProps } from "styles/system";

export interface LayoutProps extends ColorProps, SpacingProps {
  type?: "main" | "detail" | "page";
}

/**
 * @param {string} main - 메인 페이지에서 사용 (with NavBar)
 * @param {string} detail - 상세 페이지에서 사용 (with Header)
 * @param {string} page - height 100%
 */
export const Layout = ({ type = "detail", children, ...props }: PropsWithChildren<LayoutProps>) => {
  return (
    <StyledContainer type={type} {...props}>
      {children}
    </StyledContainer>
  );
};
