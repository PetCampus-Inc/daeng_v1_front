import { cloneElement, isValidElement, type ReactElement } from "react";

import { StyledButtonAddon } from "./styles";

interface ButtonAddonProps {
  children: ReactElement;
}

const ButtonAddon = (props: ButtonAddonProps) => {
  const { children, ...rest } = props;

  const _children = isValidElement(children)
    ? cloneElement<any>(children, {
        "aria-hidden": true,
        focusable: false
      })
    : children;

  return <StyledButtonAddon {...rest}>{_children}</StyledButtonAddon>;
};

export default ButtonAddon;
