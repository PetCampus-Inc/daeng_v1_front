import { AnimatePresence } from "framer-motion";
import { useClickOutSide } from "hooks/common/useClickOutSide";
import { PropsWithChildren, RefObject, memo, useRef } from "react";

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

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const BottomSheetVariants = {
    hidden: { y: "100%" },
    visible: { y: 0 }
  };

  const transition = {
    type: "spring",
    damping: 40,
    stiffness: 400
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <BottomSheetProvider onClose={close}>
          <Container>
            <BackDrop
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              transition={{ duration: 0.3 }}
            />
            <StyledBottomSheet
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={BottomSheetVariants}
              transition={transition}
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
