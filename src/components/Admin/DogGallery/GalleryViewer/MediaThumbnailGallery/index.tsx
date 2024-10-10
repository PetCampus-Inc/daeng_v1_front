import { Text } from "components/common";
import { useEffect, useRef, useCallback } from "react";

import * as S from "./styles";

interface MediaItem {
  src: string;
  isVideo: boolean;
}

interface MediaThumbnailGalleryProps {
  items: MediaItem[];
  selectedIndex: number;
  handleClick: (index: number) => void;
}

const MediaThumbnailGallery: React.FC<MediaThumbnailGalleryProps> = ({
  items,
  selectedIndex,
  handleClick
}) => {
  const selectedThumbnailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedThumbnailRef.current) {
      selectedThumbnailRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }
  }, [selectedIndex]);

  return (
    <S.ThumbnailContainer>
      <S.ThumbnailItemsContainer>
        {items.map((item, index) => (
          <S.ThumbnailItemWrapper
            key={index}
            onClick={() => handleClick(index)}
            isSelected={index === selectedIndex}
            ref={index === selectedIndex ? selectedThumbnailRef : null} // Assign ref to selected item
          >
            <img src={item.src} alt={`Thumbnail ${index + 1}`} />
          </S.ThumbnailItemWrapper>
        ))}
      </S.ThumbnailItemsContainer>
    </S.ThumbnailContainer>
  );
};

export default MediaThumbnailGallery;
