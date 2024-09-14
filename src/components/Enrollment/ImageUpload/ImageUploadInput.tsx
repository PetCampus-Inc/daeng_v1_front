import UploadIcon from "assets/svg/upload-icon";
import CloseIcon from "assets/svg/x-circle-icon";
import { Box, Flex } from "components/common";
import { useOverlay } from "hooks/common/useOverlay";
import { useRef, ChangeEvent, forwardRef } from "react";

import { LightBox } from "./LightBox";
import * as S from "./styles";

export interface ImageFile {
  file: File;
  src: string;
}

interface ImageUploadInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: ImageFile[];
  onChange?: (files: ImageFile[] | undefined) => void;
}

export const ImageUploadInput = forwardRef<HTMLInputElement, ImageUploadInputProps>(
  function ImageUploadInput({ value = [], onChange, ...props }, ref) {
    const inputRef = useRef<HTMLInputElement>(null);
    const overlay = useOverlay();

    const openLightBox = (image: ImageFile) =>
      overlay.open(({ isOpen, close }) => (
        <LightBox image={image} isOpen={isOpen} onClose={close} />
      ));

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files).map((file) => ({
          file,
          src: URL.createObjectURL(file)
        }));
        onChange?.([...value, ...newFiles]);
      }
    };

    const handleDeleteImage = (index: number) => {
      const newFiles = value?.filter((_, i) => i !== index);
      onChange?.(newFiles);
    };

    const handleClick = () => {
      inputRef.current?.click();
    };

    const addText = value.length > 0 ? "추가 업로드" : "사진 업로드";

    return (
      <Flex direction="column">
        <S.Upload
          onClick={handleClick}
          disabled={props.disabled}
          className={value.length > 0 ? "add" : ""}
        >
          <UploadIcon /> {addText}
        </S.Upload>
        {value.length > 0 && (
          <S.PreviewContainer>
            {value.map((image, index) => (
              <Box position="relative" key={index}>
                <Box
                  width={75}
                  height={75}
                  overflow="hidden"
                  position="relative"
                  radius="rectangle"
                >
                  <Box as="button" width="full" height="full" onClick={() => openLightBox(image)}>
                    <S.InnerShadow />
                    <S.Img src={image.src} alt={image.file.name} />
                  </Box>
                </Box>
                {!props.disabled && (
                  <S.StyledDeleteButton
                    onClick={() => handleDeleteImage(index)}
                    aria-label="이미지 삭제"
                  >
                    <CloseIcon />
                  </S.StyledDeleteButton>
                )}
              </Box>
            ))}
          </S.PreviewContainer>
        )}
        <S.HiddenUpload
          type="file"
          ref={inputRef}
          multiple
          accept="image/*"
          onChange={handleImageChange}
          disabled={props.disabled}
          {...props}
        />
      </Flex>
    );
  }
);
