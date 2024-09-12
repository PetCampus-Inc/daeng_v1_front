import CloseIcon from "assets/svg/x-circle-icon";
import { FloatingOverlay } from "components/common/FloatingOverlay";
import Portal from "components/common/Portal";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutSide } from "hooks/common/useClickOutSide";
import { useRef } from "react";
import { dialogAnimationVariants } from "styles/foundations/animation";
import { OverlayContainer, OverlayWrapper } from "styles/StyleModule";

import { DeleteButton, Img } from "./styles";

import type { ImageFile } from "./ImageUploadInput";

interface LightBoxProps {
  image: ImageFile;
  isOpen: boolean;
  onClose: () => void;
}

export function LightBox({ image, isOpen, onClose }: LightBoxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutSide({
    enabled: isOpen,
    targetRef: ref,
    onClickOutside: onClose
  });

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <FloatingOverlay type="dimmed" animate lockScroll />
            <OverlayContainer
              as={motion.div}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={dialogAnimationVariants}
            >
              <OverlayWrapper ref={ref}>
                <div>
                  <DeleteButton type="button" onClick={onClose}>
                    <CloseIcon colorScheme="darkGray" w={30} h={30} />
                  </DeleteButton>
                  <Img src={image.src} alt={image.file.name} />
                </div>
              </OverlayWrapper>
            </OverlayContainer>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}
