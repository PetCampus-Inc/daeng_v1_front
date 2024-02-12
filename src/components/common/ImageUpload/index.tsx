import { useRef, ChangeEvent, useState, useEffect } from "react";
import UploadIcon from "assets/svg/upload-icon";
import CloseIcon from "assets/svg/close-icon";

import * as S from "./styles";
import ImageModal from "./ImageModal";

interface ImageUploadProps {
  id?: string;
  disabled?: boolean;
}
export interface ImageFile {
  file: File;
  preview: string;
}

const ImageUpload = ({ id, disabled }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageFile[]>([]);
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

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);

  const text = images.length > 0 ? "추가 업로드" : "사진 업로드";

  return (
    <S.Container>
      <S.Upload onClick={handleClick} disabled={disabled}>
        <UploadIcon /> {text}
      </S.Upload>
      {images.length > 0 && (
        <S.PreviewContainer>
          {images.map((image, index) => (
            <S.PreviewItem key={index}>
              <S.PreviewInner>
                <S.PreviewButton disabled={disabled} onClick={() => handleImageClick(image)}>
                  <S.InnerShadow />
                  <S.PreviewImg src={image.preview} alt={image.file.name} />
                </S.PreviewButton>
              </S.PreviewInner>
              <S.DeleteButton onClick={() => handleDeleteImage(index)} aria-label="이미지 삭제">
                <CloseIcon />
              </S.DeleteButton>
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
