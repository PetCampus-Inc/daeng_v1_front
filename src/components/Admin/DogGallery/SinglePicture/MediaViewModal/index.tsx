import CloseIcon from "assets/svg/x-circle-icon";
import { AlbumCheckBox } from "components/Admin/DogGallery/SinglePicture/AlbumCheckBox";
import { FloatingOverlay } from "components/common/FloatingOverlay";
import { ModalProps } from "components/common/Modal";
import Portal from "components/common/Portal";
import { VideoPlayer } from "components/common/VideoPlayer";

import * as S from "./styles";

interface MediaViewModalProps extends ModalProps {
  src: string;
  selected?: boolean;
  isVideo?: boolean;
  onChange?: (src: string) => void;
}

export const MediaViewModal = ({
  src,
  isVideo,
  isOpen,
  close,
  selected,
  onChange
}: MediaViewModalProps) => {
  return (
    <Portal>
      {isOpen && (
        <>
          <FloatingOverlay type="dimmed" animate lockScroll onClick={close} />
          <S.Container>
            {/* 닫기 버튼 */}
            <S.CloseButton onClick={close}>
              <CloseIcon colorScheme="black" w={31} h={31} opacity={0.7} />
            </S.CloseButton>

            {isVideo ? <VideoPlayer src={src} /> : <S.Image src={src} />}

            <S.CheckBoxWrap>
              <AlbumCheckBox checked={selected} onChange={() => onChange?.(src)} />
            </S.CheckBoxWrap>
          </S.Container>
        </>
      )}
    </Portal>
  );
};
