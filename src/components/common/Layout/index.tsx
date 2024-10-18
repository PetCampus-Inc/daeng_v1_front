import type { PropsWithChildren } from "react";

import { StyledContainer } from "./styles";

import type { ColorProps, SpacingProps } from "styles/system";

export interface LayoutProps extends ColorProps, SpacingProps {
  type?: "main" | "detail" | "page" | "disconnected";
  isDisconnected?: boolean; // - disconnected 유치원 연결 끊긴 강아지 UI 표시 (with disconnected)
}

/**
 * @param {string} main - 메인 페이지에서 사용 (with NavBar)
 * @param {string} detail - 상세 페이지에서 사용 (with Header)
 * @param {string} page - height 100%
 */
export const Layout = ({
  type = "detail",
  children,
  isDisconnected,
  ...props
}: PropsWithChildren<LayoutProps>) => {
  return (
    <StyledContainer className={isDisconnected ? "disconnected" : ""} type={type} {...props}>
      {children}
    </StyledContainer>
  );
};
