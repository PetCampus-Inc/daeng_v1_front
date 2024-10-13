import ExpandIcon from "assets/svg/expand-icon";
import { MediaViewModal } from "components/Admin/DogGallery/SinglePicture/MediaViewModal";
import { Box } from "components/common";
import { Image } from "components/common/Image";
import { useOverlay } from "hooks/common/useOverlay";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isVideo = uri.endsWith(".mp4");

  /** 이미지 선택 핸들러 */
  const handleSelect = () => onSelect?.(uri);

  const handleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <S.Container onClick={onClick} data-edit-mode={isEditing}>
      {/* 이미지 */}
      <Image src={uri} ratio="1/1" showVideoIcon />

      {/* 이미지 선택 체크박스 */}
      {isEditing && (
        <>
          <Box position="absolute" top={8} right={8}>
            <AlbumCheckBox checked={selected} onChange={handleSelect} />
          </Box>
          <Box position="absolute" bottom={4} left={4} onClick={handleExpand}>
            <ExpandIcon />
          </Box>
        </>
      )}

      <MediaViewModal
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        src={uri}
        selected={selected}
        isVideo={isVideo}
        onChange={handleSelect}
      />
    </S.Container>
  );
};

export default SinglePicture;
