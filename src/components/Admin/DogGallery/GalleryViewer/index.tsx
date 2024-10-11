import { Text } from "components/common";
import { useState, useRef, useEffect } from "react";

import * as S from "./styles";
import ThumbnailVideo from "./ThumbnailVideo";
import { VideoPlayer } from "./VideoPlayer";

interface MediaItem {
  imageId: number;
  imageUrl: string;
  isVideo: boolean;
}
interface GalleryProps {
  mediaItems: MediaItem[];
  selectedMedia: MediaItem;
  onChangeSelected?: (item: MediaItem) => void;
}

// 전체 Gallery 컴포넌트
const GalleryViewer = ({ mediaItems = [], selectedMedia, onChangeSelected }: GalleryProps) => {
  const initialIndex = mediaItems.findIndex((media) => media.imageId === selectedMedia.imageId);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const selectedThumbnailRef = useRef<HTMLDivElement | null>(null);

  const onClick = (index: number) => {
    setCurrentIndex(index);
    onChangeSelected?.(mediaItems[index]);
  };

  useEffect(() => {
    if (selectedThumbnailRef.current) {
      selectedThumbnailRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }
  }, [currentIndex]);

  return (
    <S.GalleryWrapper>
      {/* 선택된 미디어 영역 */}
      <S.MainMediaDisplay>
        {selectedMedia.isVideo ? (
          <VideoPlayer src={selectedMedia.imageUrl} />
        ) : (
          <S.SelectedMediaImage src={selectedMedia.imageUrl} alt="Main Display" />
        )}
      </S.MainMediaDisplay>

      {/* 미디어 리스트 영역 */}
      <S.ThumbnailListWrapper>
        <S.ThumbnailItemsList>
          {mediaItems.map((item, index) => {
            const { isVideo, imageUrl, imageId } = item;
            return (
              <S.ThumbnailItemContainer
                key={imageId}
                $isSelected={index === currentIndex}
                onClick={() => onClick(index)}
                ref={index === currentIndex ? selectedThumbnailRef : null}
              >
                {isVideo ? <ThumbnailVideo uri={imageUrl} /> : <img src={imageUrl} />}
              </S.ThumbnailItemContainer>
            );
          })}
        </S.ThumbnailItemsList>
      </S.ThumbnailListWrapper>

      {/* 이미지 Indicator 영역 */}
      <Text typo="label1_16_B" textAlign="center">
        {mediaItems.length}장 중 {currentIndex + 1}번
      </Text>
    </S.GalleryWrapper>
  );
};

export default GalleryViewer;
