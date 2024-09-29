import PlayIcon from "assets/svg/play-icon";
import { MediaViewModal } from "components/Admin/DogGallery/SinglePicture/MediaViewModal";
import { useOverlay } from "hooks/common/useOverlay";

import { AlbumCheckBox } from "./AlbumCheckBox";
import * as S from "./styles";

export interface AlbumImage {
  imageId: number;
  imageUrl: string;
}

interface SinglePictureProps {
  src: string;
  isVideo?: boolean;
  selected?: boolean;
  isEditing?: boolean;
  onSelect?: (src: string) => void;
}

const SinglePicture = ({
  src,
  isVideo = false,
  selected,
  isEditing,
  onSelect
}: SinglePictureProps) => {
  const overlay = useOverlay();

  /** 클릭 핸들러 */
  const handleClick = () => isEditing || openMediaViewModal();

  /** 이미지 선택 핸들러 */
  const handleSelect = () => onSelect?.(src);

  /** 모달 열기 */
  const openMediaViewModal = () => {
    overlay.open(({ isOpen, close }) => (
      <MediaViewModal isOpen={isOpen} close={close} src={src} isVideo={isVideo} />
    ));
  };

  return (
    <S.Container onClick={handleClick} data-edit-mode={isEditing}>
      {/* 이미지 */}
      <S.Image src={src} />

      {/* 이미지 선택 체크박스 */}
      {isEditing && (
        <S.CheckBoxWrap>
          <AlbumCheckBox checked={selected} onChange={handleSelect} />
        </S.CheckBoxWrap>
      )}

      {/* 비디오 아이콘 */}
      {isVideo && (
        <S.VideoIconWrap>
          <PlayIcon w={16} h={16} />
        </S.VideoIconWrap>
      )}
    </S.Container>
  );
};

export default SinglePicture;
