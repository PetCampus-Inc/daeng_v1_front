import CloseIcon from "assets/svg/close-icon";
import Portal from "components/common/Modal/portal";

import type { ImageFile } from "..";
import { BackDrop, MainWrapper, DeleteButton, PreviewImg, PreviewItem } from "./styles";

interface ImageModalProps {
  image: ImageFile;
  onClose: () => void;
}

const ImageModal = ({ image, onClose }: ImageModalProps) => {
  return (
    <Portal>
      <BackDrop>
        <MainWrapper>
          <DeleteButton onClick={onClose}>
            <CloseIcon />
          </DeleteButton>
          <PreviewItem>
            <PreviewImg src={image.preview} alt={image.file.name} />
          </PreviewItem>
        </MainWrapper>
      </BackDrop>
    </Portal>
  );
};

export default ImageModal;
