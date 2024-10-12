import { ModalProps } from "components/common/Modal";
import Portal from "components/common/Portal";
import { AnimatePresence } from "framer-motion";

import * as S from "./styles";

interface MediaDetailPopupProps extends ModalProps {
  uri: string;
}

const MediaDetailPopup = ({ isOpen, close, uri }: MediaDetailPopupProps) => {
  const handleOverlayClose = () => {
    close();
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Portal>
          <S.Wrapper>
            <S.FloatingOverlay onClick={handleOverlayClose}>
              <S.DetailsImgBox>
                <img src={uri} />
              </S.DetailsImgBox>
            </S.FloatingOverlay>
          </S.Wrapper>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default MediaDetailPopup;
