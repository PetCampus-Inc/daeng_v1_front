import { AnimatePresence } from "framer-motion";
import { useClickOutSide } from "hooks/common/useClickOutSide";
import { PropsWithChildren, RefObject, useRef } from "react";
import { bottomSheetAnimationVariants } from "styles/animation";

import { BottomSheetProvider } from "./BottomSheetContext";
import { StyledBottomSheet } from "./styles";
import { FloatingOverlay } from "../FloatingOverlay";
import Portal from "../Portal";

export interface BottomSheetProps {
  isOpen: boolean;
  close: () => void;
}

interface BottomSheetRootProps extends BottomSheetProps {
  disableDimmed?: boolean;
}

export const RootBottomSheet = ({
  children,
  isOpen,
  close,
  disableDimmed
}: PropsWithChildren<BottomSheetRootProps>) => {
  const bottomSheetRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useClickOutSide({
    enabled: isOpen,
    targetRef: bottomSheetRef,
    onClickOutside: close
  });

  const floatingOverlayType = disableDimmed ? "default" : "dimmed";

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {isOpen && (
          <BottomSheetProvider onClose={close}>
            <FloatingOverlay type={floatingOverlayType} animate lockScroll />
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
          </BottomSheetProvider>
        )}
      </AnimatePresence>
    </Portal>
  );
};
