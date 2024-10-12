import PlayIcon from "assets/svg/play-icon";
import { MediaViewModal } from "components/Admin/DogGallery/SinglePicture/MediaViewModal";
import { useOverlay } from "hooks/common/useOverlay";
import { useEffect, useState } from "react";
import { getVideoThumb } from "utils/thumb";

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
  const [imageSrc, setImageSrc] = useState<string>(uri);

  // TODO: 추후 보완이 필요해 보임
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

  /** 비디오 썸네일 로드 */
  useEffect(() => {
    const loadSrc = async () => {
      if (isVideo) {
        try {
          const response = await fetch(uri);
          const blob = await response.blob();

          const fileName = "video.mp4";
          const fileType = "video/mp4";
          const file = new File([blob], fileName, { type: fileType });

          const videoThumb = await getVideoThumb(file);
          setImageSrc(videoThumb.thumbnail);
        } catch (error) {
          console.error(error);
          setImageSrc(uri);
        }
      } else {
        setImageSrc(uri);
      }
    };

    loadSrc();
  }, [uri, isVideo]);

  return (
    <S.Container onClick={handleClick} data-edit-mode={isEditing}>
      {/* 이미지 */}
      <S.Image src={imageSrc} />

      {/* 이미지 선택 체크박스 */}
      {isEditing && (
        <S.CheckBoxWrap>
          <AlbumCheckBox checked={selected} onChange={handleSelect} />
        </S.CheckBoxWrap>
      )}

      {/* 비디오 아이콘 */}
      {isVideo && (
        <S.VideoIconWrap>
          <PlayIcon w={22} h={22} />
        </S.VideoIconWrap>
      )}
    </S.Container>
  );
};

export default SinglePicture;
