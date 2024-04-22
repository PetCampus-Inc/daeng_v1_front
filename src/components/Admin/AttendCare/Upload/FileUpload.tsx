import AddCIcon from "assets/svg/add-c-icon";
import { ForwardedRef, forwardRef, useRef } from "react";

import { StyledHiddenUpload, StyledUpload } from "./styles";

type UploadProps = React.HTMLAttributes<HTMLInputElement> & {
  disabled?: boolean;
  accept?: string | string[];
};

export const Upload = forwardRef(function Upload(
  { disabled = false, accept = "image/*", onChange, ...props }: UploadProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const originRef = useRef<HTMLInputElement>(null);
  const fileInputRef = ref || originRef;

  const acceptType = Array.isArray(accept) ? accept.join(",") : accept;

  const handleClick = () => {
    if ("current" in fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      <StyledUpload onClick={handleClick}>
        <AddCIcon />
      </StyledUpload>
      <StyledHiddenUpload
        type="file"
        ref={fileInputRef}
        multiple
        accept={acceptType}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
    </>
  );
});
