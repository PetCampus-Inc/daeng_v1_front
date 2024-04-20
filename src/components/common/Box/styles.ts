import styled from "styled-components";

import { BoxOptions } from "./index";

export const StyledBox = styled.div.attrs<BoxOptions>((props) => ({
  style: {
    width: props.width || undefined,
    height: props.height || undefined,
    margin: props.margin || undefined,
    marginRight: props.mr || undefined,
    marginTop: props.mt || undefined,
    marginLeft: props.ml || undefined,
    marginBottom: props.mb || undefined,
    padding: props.padding || undefined,
    paddingTop: props.pt || undefined,
    paddingRight: props.pr || undefined,
    paddingBottom: props.pb || undefined,
    paddingLeft: props.pl || undefined,
    border: props.border || undefined,
    borderRadius: props.borderRadius || undefined,
    borderColor: props.borderColor || undefined,
    borderTop: props.borderTop || undefined,
    borderRight: props.borderRight || undefined,
    borderBottom: props.borderBottom || undefined,
    borderLeft: props.borderLeft || undefined,
    backgroundColor: props.bg || undefined,
    color: props.color || undefined,
    position: props.position || undefined
  }
}))``;
