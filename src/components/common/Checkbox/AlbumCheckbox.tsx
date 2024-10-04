import { type InputHTMLAttributes, forwardRef } from "react";

import { HiddenCheckbox, StyledAlbumCheckbox } from "./styles";
import { Box } from "../Box";

const AlbumCheckbox = forwardRef(function AlbumCheckbox(
  { ...props }: InputHTMLAttributes<HTMLInputElement>,
  ref
) {
  return (
    <Box as="label" htmlFor={props.id}>
      <HiddenCheckbox
        type="checkbox"
        ref={ref as React.RefObject<HTMLInputElement>}
        disabled={props.disabled}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          e.stopPropagation();
          props.onChange?.(e);
        }}
        {...props}
      />
      <StyledAlbumCheckbox
        className={props.checked ? "checked" : ""}
        aria-disabled={props.disabled ? "true" : undefined}
      />
    </Box>
  );
});

export default AlbumCheckbox;
