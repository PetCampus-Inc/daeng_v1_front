import { CarouselLightBox } from "components/common/LightBox";
import { ModalProps } from "components/common/Modal";
import Portal from "components/common/Portal";
import { AnimatePresence } from "framer-motion";
import { dimmerAnimationVariants } from "styles/animation";
import { BackDrop } from "styles/StyleModule";
import { ImageListType } from "types/member/main.types";

interface LightBoxPopupProps extends ModalProps {
  images: ImageListType[];
  currentSlide: number;
}

const LightBoxPopup = ({ isOpen, close, images, currentSlide }: LightBoxPopupProps) => {
  return (
    <Portal>
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <BackDrop
              initial="initial"
              animate="animate"
              exit="exit"
              variants={dimmerAnimationVariants}
              aria-hidden="true"
            />
            <CarouselLightBox images={images} currentSlide={currentSlide} close={close} />
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default LightBoxPopup;
