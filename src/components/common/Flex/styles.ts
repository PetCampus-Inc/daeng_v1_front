import styled from "styled-components";

import type { FlexOptions } from ".";

export const StyledFlex = styled.div.attrs<FlexOptions>((props) => ({
  style: {
    display: props.display || "flex",
    gap: props.gap + "px" || undefined,
    flexDirection: props.direction || undefined,
    alignItems: props.align || undefined,
    justifyContent: props.justify || undefined,
    flexWrap: props.wrap || undefined,
    flexBasis: props.basis || undefined,
    flexGrow: props.grow || undefined,
    flexShrink: props.shrink || undefined
  }
}))``;
