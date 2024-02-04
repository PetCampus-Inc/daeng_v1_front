import React, {
  CSSProperties,
  memo,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef
} from "react";
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

  return (
    <BottomSheetPortal>
      <StyledModalBackground />
      <StyledBottomSheet height={height} style={customStyle} ref={bottomSheetRef}>
        {children}
      </StyledBottomSheet>
    </BottomSheetPortal>
  );
};

export default memo(BottomSheet);
