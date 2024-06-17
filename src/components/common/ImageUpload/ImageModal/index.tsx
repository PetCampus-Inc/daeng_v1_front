import CloseIcon from "assets/svg/x-circle-icon";
import { FloatingOverlay } from "components/common/FloatingOverlay";
import Portal from "components/common/Portal";

import { MainWrapper, DeleteButton, PreviewImg, PreviewItem } from "./styles";

import type { ImageFile } from "store/form";

interface ImageModalProps {
  image: ImageFile;
  onClose: () => void;
}

const ImageModal = ({ image, onClose }: ImageModalProps) => {
  return (
    <Portal>
      <FloatingOverlay type="dimmed" animate lockScroll />
      <MainWrapper>
        <DeleteButton onClick={onClose}>
          <CloseIcon />
        </DeleteButton>
        <PreviewItem>
          <PreviewImg src={image.preview} alt={image.file.name} />
        </PreviewItem>
      </MainWrapper>
    </Portal>
  );
};

export default ImageModal;
