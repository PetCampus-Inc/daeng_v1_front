import { MediaViewModal } from "components/Admin/DogGallery/SinglePicture/MediaViewModal";
import { Image } from "components/common/Image";
import { useOverlay } from "hooks/common/useOverlay";

import { AlbumCheckBox } from "./AlbumCheckBox";
import * as S from "./styles";

export interface AlbumImage {
  imageId: number;
  imageUrl: string;
}

interface SinglePictureProps {
  uri: string;
  selected?: boolean;
  isEditing?: boolean;
  onSelect?: (src: string) => void;
  onClick?: () => void;
}

const SinglePicture = ({ uri, selected, isEditing, onSelect, onClick }: SinglePictureProps) => {
  const overlay = useOverlay();
  const isVideo = uri.endsWith(".mp4");

  /** 이미지 클릭 핸들러 */
  const handleClick = () => (isEditing ? openMediaViewModal() : onClick?.());

  /** 이미지 선택 핸들러 */
  const handleSelect = () => onSelect?.(uri);

  /** 프리뷰 모달 열기 */
  const openMediaViewModal = () => {
    overlay.open(({ isOpen, close }) => (
      <MediaViewModal isOpen={isOpen} close={close} src={uri} isVideo={isVideo} />
    ));
  };

  return (
    <S.Container onClick={handleClick} data-edit-mode={isEditing}>
      {/* 이미지 */}
      <Image src={uri} ratio="1/1" />

      {/* 이미지 선택 체크박스 */}
      {isEditing && (
        <S.CheckBoxWrap>
          <AlbumCheckBox checked={selected} onChange={handleSelect} />
        </S.CheckBoxWrap>
      )}
    </S.Container>
  );
};

export default SinglePicture;
