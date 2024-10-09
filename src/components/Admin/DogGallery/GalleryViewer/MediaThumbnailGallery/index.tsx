import { Text } from "components/common";

import * as S from "./styles";

interface MediaItem {
  src: string;
  isVideo: boolean;
}

interface MediaThumbnailGalleryProps {
  items: MediaItem[];
  selectedIndex: number;
}

const MediaThumbnailGallery: React.FC<MediaThumbnailGalleryProps> = ({ items, selectedIndex }) => (
  <S.ThumbnailContainer>
    <S.ThumbnailItemContainer>
      {items.map((item, index) => (
        <S.Thumbnail key={index} src={item.src} isSelected={index === selectedIndex} />
      ))}
    </S.ThumbnailItemContainer>
    <S.IndicatorContainer>
      <Text typo="label1_16_B">5장 중 1번</Text>
    </S.IndicatorContainer>
  </S.ThumbnailContainer>
);

export default MediaThumbnailGallery;
