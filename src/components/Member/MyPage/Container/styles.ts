import { Layout } from "components/common";
import styled from "styled-components";

import type { ColorKeys } from "styles/types";

export const LayoutContainer = styled(Layout)`
  height: calc(100% - 78px); // Layout height -48px 제거
`;

export const PageContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["pt", "imageUrl", "backgroundColor"].includes(prop)
})<{
  pt?: string;
  imageUrl?: string;
  backgroundColor?: ColorKeys;
}>`
  padding-top: ${({ pt }) => (pt ? `calc(5vh + ${pt}rem)` : "calc(5vh)")};
  background: ${({ imageUrl }) =>
    imageUrl &&
    `linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(${imageUrl}) lightgray 50% / cover no-repeat`};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor && theme.colors[backgroundColor]};
  width: 100%;
  background-size: cover;

  &::-webkit-scrollbar {
    display: none;
  }
`;
