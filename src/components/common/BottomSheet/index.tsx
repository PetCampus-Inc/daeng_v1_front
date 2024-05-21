import { AnimatePresence } from "framer-motion";
import { useClickOutSide } from "hooks/common/useClickOutSide";
import { PropsWithChildren, RefObject, memo, useRef } from "react";
import { bottomSheetAnimationVariants, dimmerAnimationVariants } from "styles/animation";

import BottomSheetButton from "./BottomSheetButton";
import BottomSheetContent from "./BottomSheetContent";
import BottomSheetControl from "./BottomSheetControl";
import { BottomSheetSubTitle, BottomSheetTitle } from "./BottomSheetTitle";
import { BottomSheetProvider } from "./provider";
import { StyledBottomSheet, BackDrop, Container } from "./styles";

export interface IBottomSheetProps {
  isOpen: boolean;
  close: () => void;
}

interface IBottomSheet
  extends React.MemoExoticComponent<React.FC<PropsWithChildren<IBottomSheetProps>>> {
  Content: typeof BottomSheetContent;
  Control: typeof BottomSheetControl;
  Button: typeof BottomSheetButton;
  Title: typeof BottomSheetTitle;
  Subtitle: typeof BottomSheetSubTitle;
}

const BottomSheetBase = ({ children, isOpen, close }: PropsWithChildren<IBottomSheetProps>) => {
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
              exit="initial"
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

const BottomSheet = memo(BottomSheetBase) as IBottomSheet;

BottomSheet.Content = BottomSheetContent;
BottomSheet.Control = BottomSheetControl;
BottomSheet.Button = BottomSheetButton;
BottomSheet.Title = BottomSheetTitle;
BottomSheet.Subtitle = BottomSheetSubTitle;

export default BottomSheet;
