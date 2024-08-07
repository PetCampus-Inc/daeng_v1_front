import UploadIcon from "assets/svg/upload-icon";
import CloseIcon from "assets/svg/x-circle-icon";
import { useRef, ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { imagePreviewAtom } from "store/form";

import ImageModal from "./ImageModal";
import * as S from "./styles";

import type { ImageFile } from "store/form";

interface ImageUploadProps {
  id?: string;
  disabled?: boolean;
}

const ImageUpload = ({ id, disabled }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useRecoilState<ImageFile[]>(imagePreviewAtom);
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages((prevImages) => [...prevImages, ...fileArray]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const imageToDelete = images[index];
    URL.revokeObjectURL(imageToDelete.preview);
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageClick = (image: ImageFile) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const text = images.length > 0 ? "추가 업로드" : "사진 업로드";

  return (
    <S.Container>
      <S.Upload
        onClick={handleClick}
        disabled={disabled}
        className={images.length > 0 ? "add" : ""}
      >
        <UploadIcon /> {text}
      </S.Upload>
      {images.length > 0 && (
        <S.PreviewContainer>
          {images.map((image, index) => (
            <S.PreviewItem key={index}>
              <S.PreviewInner>
                <S.PreviewButton disabled={disabled} onClick={() => handleImageClick(image)}>
                  <S.InnerShadow />
                  <S.StyledThumbImg src={image.preview} alt={image.file.name} />
                </S.PreviewButton>
              </S.PreviewInner>
              <S.StyledDeleteButton
                onClick={() => handleDeleteImage(index)}
                aria-label="이미지 삭제"
              >
                <CloseIcon />
              </S.StyledDeleteButton>
            </S.PreviewItem>
          ))}
        </S.PreviewContainer>
      )}
      {showModal && selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setShowModal(false)} />
      )}
      <S.HiddenUpload
        type="file"
        id={id}
        ref={fileInputRef}
        multiple
        accept="image/*"
        onChange={handleImageChange}
        disabled={disabled}
      />
    </S.Container>
  );
};

export default ImageUpload;
