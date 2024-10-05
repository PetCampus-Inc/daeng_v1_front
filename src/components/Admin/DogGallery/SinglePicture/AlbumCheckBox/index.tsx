import { forwardRef, InputHTMLAttributes } from "react";

import { StyledAlbumCheckBox } from "./style";

type AlbumCheckBoxProps = InputHTMLAttributes<HTMLInputElement>;

export const AlbumCheckBox = forwardRef<HTMLInputElement, AlbumCheckBoxProps>((props, ref) => {
  return (
    <StyledAlbumCheckBox onClick={(e) => e.stopPropagation()}>
      <input ref={ref} type="checkbox" {...props} />
    </StyledAlbumCheckBox>
  );
});
