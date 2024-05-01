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
  width: ${(props) => props.width || undefined};
  height: ${(props) => props.height || undefined};
  max-width: ${(props) => props.maxWidth || undefined};
  max-height: ${(props) => props.maxHeight || undefined};
  overflow-x: ${(props) => props.overflowX || undefined};
  overflow-y: ${(props) => props.overflowY || undefined};
  margin: ${(props) => props.margin || undefined};
  padding: ${(props) => props.padding || undefined};

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
