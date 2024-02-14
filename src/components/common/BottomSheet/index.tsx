import React, {
  CSSProperties,
  memo,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef
} from "react";
import { AnimatePresence } from "framer-motion";
import { StyledModalBackground } from "../Modal/styles";
import { StyledBottomSheet } from "./styles";
import BottomSheetPortal from "./bottomSheetPortal";

interface IBottomSheet {
  children: ReactNode;
  onClose: () => void;
  height?: string;
  customStyle?: CSSProperties;
}

const BottomSheet = ({ children, onClose, customStyle, height = "auto" }: IBottomSheet) => {
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
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const BottomSheetVariants = {
    hidden: { y: "100vh", x: "50", opacity: 0 },
    visible: { y: 0, x: "50", opacity: 1 },
    exit: { y: "-100", x: "50", opacity: 0 }
  };

  return (
    <AnimatePresence mode="wait">
      <BottomSheetPortal>
        <StyledModalBackground
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
          height={height}
          style={customStyle}
          ref={bottomSheetRef}
        >
          {children}
        </StyledBottomSheet>
      </BottomSheetPortal>
    </AnimatePresence>
  );
};

export default memo(BottomSheet);
