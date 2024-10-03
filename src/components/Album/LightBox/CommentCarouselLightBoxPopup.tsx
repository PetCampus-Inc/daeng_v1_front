import { FloatingOverlay } from "components/common/FloatingOverlay";
import Portal from "components/common/Portal";
import { AnimatePresence } from "framer-motion";

import { CommentCarouselLightBox, type ImageListType } from "./CommentCarouselLightBox";

interface CommentCarouselLightBoxPopupProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageListType[];
  currentSlide: number;
}

export function CommentCarouselLightBoxPopup({
  isOpen,
  onClose,
  images,
  currentSlide
}: CommentCarouselLightBoxPopupProps) {
  return (
    <Portal>
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <FloatingOverlay type="dimmed" animate lockScroll />
            <CommentCarouselLightBox
              images={images}
              currentSlide={currentSlide}
              onClose={onClose}
            />
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}
