import styled from "styled-components";

import type { FlexOptions } from ".";

export const StyledFlex = styled.div.withConfig({
  displayName: "Flex",
  shouldForwardProp: (prop) =>
    ![
      "gap",
      "width",
      "height",
      "maxWidth",
      "maxHeight",
      "overflowX",
      "overflowY",
      "margin",
      "padding",
      "display",
      "direction",
      "align",
      "justify",
      "wrap",
      "basis",
      "grow",
      "shrink"
    ].includes(prop)
})<FlexOptions>`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  max-width: ${(props) => props.maxWidth || "none"};
  max-height: ${(props) => props.maxHeight || "none"};
  overflow-x: ${(props) => props.overflowX || "visible"};
  overflow-y: ${(props) => props.overflowY || "visible"};
  margin: ${(props) => props.margin || 0};
  padding: ${(props) => props.padding || 0};

  display: ${(props) => props.display || "flex"};
  gap: ${(props) => (props.gap ? props.gap + "px" : undefined)};
  flex-direction: ${(props) => props.direction || undefined};
  align-items: ${(props) => props.align || undefined};
  justify-content: ${(props) => props.justify || undefined};
  flex-wrap: ${(props) => props.wrap || undefined};
  flex-basis: ${(props) => props.basis || undefined};
  flex-grow: ${(props) => props.grow || undefined};
  flex-shrink: ${(props) => props.shrink || undefined};
`;
