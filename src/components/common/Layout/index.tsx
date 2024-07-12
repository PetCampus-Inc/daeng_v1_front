import type { PropsWithChildren } from "react";

import { StyledContainer } from "./styles";

import type { LayoutType, ColorKeysScheme, TPaddingOptions, TPositionOptions } from "./types";

export type LayoutProps = TPaddingOptions &
  ColorKeysScheme &
  TPositionOptions &
  LayoutType &
  React.HTMLAttributes<HTMLDivElement>;
const Layout = ({ type, children, ...props }: PropsWithChildren<LayoutProps>) => {
  return (
    <StyledContainer type={type} {...props}>
      {children}
    </StyledContainer>
  );
};

export { Layout };

Layout.defaultProps = {
  type: "container"
};
