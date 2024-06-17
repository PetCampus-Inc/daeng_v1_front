import { AnimatePresence } from "framer-motion";
import { useClickOutSide } from "hooks/common/useClickOutSide";
import { PropsWithChildren, RefObject, useRef } from "react";
import { bottomSheetAnimationVariants, dimmerAnimationVariants } from "styles/animation";

import { BottomSheetProvider } from "./BottomSheetContext";
import { StyledBottomSheet, BackDrop, Container } from "./styles";

export interface BottomSheetProps {
  isOpen: boolean;
  close: () => void;
}

export const RootBottomSheet = ({
  children,
  isOpen,
  close
}: PropsWithChildren<BottomSheetProps>) => {
  const bottomSheetRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useClickOutSide({
    enabled: isOpen,
    targetRef: bottomSheetRef,
    onClickOutside: close
  });

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <BottomSheetProvider onClose={close}>
          <Container>
            <BackDrop
              key="dimmer"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={dimmerAnimationVariants}
              aria-hidden="true"
            />
            <StyledBottomSheet
              role="dialog"
              tabIndex={-1}
              key="bottom-sheet"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={bottomSheetAnimationVariants}
              ref={bottomSheetRef}
            >
              {children}
            </StyledBottomSheet>
          </Container>
        </BottomSheetProvider>
      )}
    </AnimatePresence>
  );
};
