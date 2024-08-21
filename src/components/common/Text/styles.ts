import styled, { css } from "styled-components";

import type { TextOptions } from ".";

export const StyledText = styled.span.withConfig({
  displayName: "Text",
  shouldForwardProp: (prop) =>
    !["color", "typo", "isEllipsis", "textAlign", "whiteSpace", "textDecoration"].includes(prop)
})<TextOptions>`
  color: ${(props) => props.theme.colors[props.color || "darkBlack"]};
  ${(props) => props.theme.typo[props.typo || "body2_16_R"]}
  ${(props) =>
    props.isEllipsis &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
  text-align: ${(props) => props.textAlign};
  white-space: ${(props) => props.whiteSpace};
  text-decoration: ${(props) => props.textDecoration};
`;
