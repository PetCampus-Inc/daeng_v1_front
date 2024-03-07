import { AnimatePresence } from "framer-motion";
import { PropsWithChildren, RefObject, memo, useCallback, useEffect, useRef } from "react";

import BottomSheetButton from "./BottomSheetButton";
import BottomSheetContent from "./BottomSheetContent";
import BottomSheetControl from "./BottomSheetControl";
import { BottomSheetSubTitle, BottomSheetTitle } from "./BottomSheetTitle";
import { BottomSheetProvider } from "./provider";
import { StyledBottomSheet, BackDrop, Container } from "./styles";
import Portal from "../Modal/portal";

interface IBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IBottomSheet
  extends React.MemoExoticComponent<React.FC<PropsWithChildren<IBottomSheetProps>>> {
  Content: typeof BottomSheetContent;
  Control: typeof BottomSheetControl;
  Button: typeof BottomSheetButton;
  Title: typeof BottomSheetTitle;
  Subtitle: typeof BottomSheetSubTitle;
}

const BottomSheetBase = ({ children, isOpen, onClose }: PropsWithChildren<IBottomSheetProps>) => {
  const bottomSheetRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const onClickOutSide = useCallback(
    (e: MouseEvent): void => {
      if (bottomSheetRef.current && !bottomSheetRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("mouseup", onClickOutSide);
    return () => {
      document.removeEventListener("mouseup", onClickOutSide);
    };
  }, [onClickOutSide]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const BottomSheetVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {isOpen && (
          <BottomSheetProvider onClose={onClose}>
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
                transition={{ duration: 0.3 }}
                ref={bottomSheetRef}
              >
                {children}
              </StyledBottomSheet>
            </Container>
          </BottomSheetProvider>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const BottomSheet = memo(BottomSheetBase) as IBottomSheet;

BottomSheet.Content = BottomSheetContent;
BottomSheet.Control = BottomSheetControl;
BottomSheet.Button = BottomSheetButton;
BottomSheet.Title = BottomSheetTitle;
BottomSheet.Subtitle = BottomSheetSubTitle;

export default BottomSheet;
