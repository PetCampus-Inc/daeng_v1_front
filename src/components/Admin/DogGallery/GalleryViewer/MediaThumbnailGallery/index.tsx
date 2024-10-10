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
  const containerRef = useRef<HTMLDivElement | null>(null); // 썸네일 컨테이너의 ref

  useEffect(() => {
    // if (selectedThumbnailRef.current) {
    //   selectedThumbnailRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "center",
    //     inline: "center"
    //   });
    // }
  }, [selectedIndex]);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const thumbnails = containerRef.current.children;
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      // 중앙에 있는 썸네일을 찾음
      let closestIndex = selectedIndex;
      let closestDistance = Number.MAX_VALUE;

      for (let i = 0; i < thumbnails.length; i++) {
        const thumbnailRect = thumbnails[i].getBoundingClientRect();
        const thumbnailCenter = thumbnailRect.left + thumbnailRect.width / 2;

        const distance = Math.abs(thumbnailCenter - containerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      if (closestIndex !== selectedIndex) {
        handleClick(closestIndex); // 중앙에 있는 항목을 selectedIndex로 업데이트
      }
    }
  }, [handleClick, selectedIndex]);

  return (
    <S.ThumbnailContainer ref={containerRef}>
      <S.ThumbnailItemsContainer width={`${items.length * 4.5}rem`}>
        {items.map((item, index) => (
          <S.ThumbnailItemWrapper
            key={index}
            isSelected={index === selectedIndex}
            ref={index === selectedIndex ? selectedThumbnailRef : null} // 선택된 항목에만 ref 할당
            onClick={() => handleClick(index)}
          >
            <img src={item.src} />
          </S.ThumbnailItemWrapper>
        ))}
      </S.ThumbnailItemsContainer>
    </S.ThumbnailContainer>
  );
};

export default MediaThumbnailGallery;
