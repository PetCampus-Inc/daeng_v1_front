import PencilBrownNormalIcon from "assets/svg/pencil-brown-normal-icon";
import { ChangeEvent, forwardRef, useEffect, useState } from "react";

import * as S from "./style";

interface ProfileUploadBox {
  name?: string;
  value?: string | File;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileUploadBox = forwardRef<HTMLInputElement, ProfileUploadBox>(
  ({ value, onChange, ...props }, ref) => {
    const [previewUri, setPreviewUri] = useState<string | undefined>();

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const [file] = e.target.files;
        const fileUri = URL.createObjectURL(file);

        setPreviewUri(fileUri);
        onChange?.(e);
      }
    };

    useEffect(() => {
      if (value && typeof value === "string") setPreviewUri(value);
      else if (value && value instanceof File) setPreviewUri(URL.createObjectURL(value));
    }, [value]);

    return (
      <S.StyledProfileUploadBox>
        <S.Container>
          <input ref={ref} type="file" accept="image/*" {...props} onChange={handleFileChange} />

          {previewUri && <S.Image src={previewUri} />}

          <S.IconWrap>
            <PencilBrownNormalIcon />
          </S.IconWrap>
        </S.Container>
      </S.StyledProfileUploadBox>
    );
  }
);
