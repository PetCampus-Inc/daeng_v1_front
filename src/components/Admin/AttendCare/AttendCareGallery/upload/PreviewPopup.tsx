import CloseIcon from "assets/svg/x-circle-icon";
import { FloatingOverlay } from "components/common/FloatingOverlay";
import { ModalProps } from "components/common/Modal";
import Portal from "components/common/Portal";
import { AnimatePresence } from "framer-motion";

import { DeleteButton, PreviewImg, PreviewItem, StyledPreview } from "./styles";

import type { IFile } from "./types";

interface PreviewPopupProps extends ModalProps {
  data: IFile;
}

// FIXME: 동영상인 경우 transition 중 blocking 발생하는 듯 함.
const PreviewPopup = ({ isOpen, close, data }: PreviewPopupProps) => {
  const file = data.file;
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Portal>
          <FloatingOverlay type="dimmed" animate lockScroll />
          <StyledPreview
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={previewVariants}
            transition={transition}
          >
            <DeleteButton onClick={close}>
              <CloseIcon />
            </DeleteButton>
            <PreviewItem>
              {isImage && <PreviewImg src={data.thumbnail} alt={file.name} />}
              {isVideo && (
                <video width="100%" height="100%" controls>
                  <source src={data.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {!isImage && !isVideo && <p>Unsupported file type</p>}
            </PreviewItem>
          </StyledPreview>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default PreviewPopup;

const previewVariants = {
  hidden: { y: 100 },
  visible: { y: 0 }
};

const transition = {
  type: "spring",
  damping: 40,
  stiffness: 400,
  duration: 0.2
};
