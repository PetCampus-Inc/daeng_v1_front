import AddCIcon from "assets/svg/add-c-icon";
import { ForwardedRef, forwardRef, useRef } from "react";

import { StyledHiddenUpload, StyledUpload } from "./styles";

type UploaderProps = React.HTMLAttributes<HTMLInputElement> & {
  name: string;
  disabled?: boolean;
  accept?: string | string[];
};

export const Uploader = forwardRef(function Uploader(
  { disabled = false, accept = "image/*", onChange, ...props }: UploaderProps,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const acceptType = Array.isArray(accept) ? accept.join(",") : accept;

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <StyledUpload onClick={handleClick}>
        <AddCIcon />
      </StyledUpload>
      <StyledHiddenUpload
        {...props}
        type="file"
        ref={fileInputRef}
        multiple
        accept={acceptType}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
});
