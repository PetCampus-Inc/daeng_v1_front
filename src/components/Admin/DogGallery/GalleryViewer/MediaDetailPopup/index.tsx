import { ModalProps } from "components/common/Modal";
import Portal from "components/common/Portal";
import { AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import * as S from "./styles";

interface MediaDetailPopupProps extends ModalProps {
  uri: string;
}

const MediaDetailPopup = ({ isOpen, close, uri }: MediaDetailPopupProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [touchDistance, setTouchDistance] = useState<number | null>(null);

  const handleOverlayClose = () => {
    close();
  };

  const calculateDistance = (touches: TouchList) => {
    const [touch1, touch2] = [touches[0], touches[1]];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      const initialDistance = calculateDistance(e.touches);
      setTouchDistance(initialDistance);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2 && touchDistance !== null) {
      const currentDistance = calculateDistance(e.touches);
      const scaleChange = currentDistance / touchDistance;
      setScale((prevScale) => Math.max(1, Math.min(prevScale * scaleChange, 3))); // 최소 배율 1, 최대 배율 3
      setTouchDistance(currentDistance);
    }
  };

  const handleTouchEnd = () => {
    setTouchDistance(null);
  };

  useEffect(() => {
    const imgElement = imgRef.current;

    if (!imgElement) return;

    // 터치 이벤트 등록
    imgElement.addEventListener("touchstart", handleTouchStart);
    imgElement.addEventListener("touchmove", handleTouchMove);
    imgElement.addEventListener("touchend", handleTouchEnd);

    // 컴포넌트가 언마운트될 때 이벤트 해제
    return () => {
      imgElement.removeEventListener("touchstart", handleTouchStart);
      imgElement.removeEventListener("touchmove", handleTouchMove);
      imgElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchDistance]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Portal>
          <S.Wrapper>
            <S.FloatingOverlay onClick={handleOverlayClose}>
              <S.DetailsImgBox>
                <img
                  ref={imgRef}
                  src={uri}
                  alt="Detailed View"
                  style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
                />
              </S.DetailsImgBox>
            </S.FloatingOverlay>
          </S.Wrapper>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default MediaDetailPopup;
