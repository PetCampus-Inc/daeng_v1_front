import type { PropsWithChildren } from "react";

import { CSSProp } from "styled-components";

import { Content } from "./styles";

interface BottomSheetContentProps {
  css?: CSSProp;
}

const BottomSheetContent = ({ css, children }: PropsWithChildren<BottomSheetContentProps>) => {
  return <Content css={css}>{children}</Content>;
};

export default BottomSheetContent;
