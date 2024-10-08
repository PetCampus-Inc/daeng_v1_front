import { FloatingOverlay } from "components/common/FloatingOverlay";
import { AnimatePresence } from "framer-motion";

import { type ImageListType } from "./CommentCarouselLightBox";
import { SaveModeLightBox } from "./SaveModeLightBox";

interface SaveModeLightBoxPopupProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageListType[];
  currentSlide: number;
}

export function SaveModeLightBoxPopup({
  isOpen,
  onClose,
  images,
  currentSlide
}: SaveModeLightBoxPopupProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <FloatingOverlay type="dimmed" animate lockScroll />
          <SaveModeLightBox images={images} currentSlide={currentSlide} onClose={onClose} />
        </>
      )}
    </AnimatePresence>
  );
}
