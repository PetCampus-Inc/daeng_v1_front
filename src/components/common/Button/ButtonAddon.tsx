import { cloneElement, isValidElement, type ReactElement } from "react";

import { Box } from "../Box";

interface ButtonAddonProps {
  children: ReactElement;
}

const ButtonAddon = (props: ButtonAddonProps) => {
  const { children, ...rest } = props;

  const _children = isValidElement(children)
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cloneElement<any>(children, {
        "aria-hidden": true,
        focusable: false
      })
    : children;

  return (
    <Box as="span" display="flex" justify="center" align="center" {...rest}>
      {_children}
    </Box>
  );
};

export default ButtonAddon;
