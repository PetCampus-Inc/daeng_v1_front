import React, {
  CSSProperties,
  memo,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  StyledCloseImage,
  StyledModal,
  StyledModalBackground,
  StyledModalContent,
} from "./styles";
import Portal from "./portal";

interface IModal {
  children: ReactNode;
  onClose: () => void;
  onYes?: () => void;
  onNo?: () => void;
  width?: string;
  height?: string;
  customStyle?: CSSProperties;
  isYesButton?: boolean;
  isNoButton?: boolean;
  yesComment?: string;
  noComment?: string;
  isClose?: boolean;
  type: string;
}

const Modal = ({
  children,
  onYes,
  onNo,
  onClose,
  customStyle,
  width = "700px",
  height = "400px",
  isYesButton = false,
  isNoButton = false,
  yesComment = "예",
  noComment = "아니요",
  isClose = false,
  type,
}: IModal) => {
  const modalRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const onClickOutSide = useCallback(
    (e: MouseEvent): void => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    document.addEventListener("mousedown", onClickOutSide);
    // 바깥영역클릭시 모달 종료
    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
    };
  }, [onClickOutSide]);

  return (
    <Portal>
      <StyledModalBackground>
        <StyledModal
          width={width}
          height={height}
          style={customStyle}
          ref={modalRef}
        >
          <StyledModalContent>{children}</StyledModalContent>
          {isClose && <StyledCloseImage onClick={onClose} />}
        </StyledModal>
      </StyledModalBackground>
    </Portal>
  );
};

export default memo(Modal);
