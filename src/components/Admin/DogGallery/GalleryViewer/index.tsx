import { Text } from "components/common";
import { useOverlay } from "hooks/common/useOverlay";
import { useRef, useEffect, useState } from "react";

import MediaDetailPopup from "./MediaDetailPopup";
import * as S from "./styles";
import ThumbnailVideo from "./ThumbnailVideo";
import { VideoPlayer } from "./VideoPlayer";

import type { MediaItem } from "components/Admin/DogGallery/GalleryViewer/types";

interface GalleryProps {
  mediaItems: MediaItem[];
  selectedMedia: MediaItem;
  onChangeSelected?: (item: MediaItem) => void;
}

// 전체 Gallery 컴포넌트
const GalleryViewer = ({ mediaItems = [], selectedMedia, onChangeSelected }: GalleryProps) => {
  const overlay = useOverlay();

  const [progress, setProgress] = useState<number>(0);
  const currentIndex =
    mediaItems.findIndex((media) => media.imageId === selectedMedia.imageId) ?? 0;

  const selectedThumbnailRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef<number | null>(null);
  const endXRef = useRef<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = (index: number) => {
    onChangeSelected?.(mediaItems[index]);
  };

  const handleVideoProgress = (newProgress: number) => {
    setProgress(newProgress);
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

  const handleDisplayClick = () => {
    if (selectedMedia.isVideo) {
      return;
    }

    overlay.open(({ isOpen, close }) => (
      <MediaDetailPopup
        isOpen={isOpen}
        close={close}
        uri={selectedMedia.imageUrl}
      ></MediaDetailPopup>
    ));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    if (startXRef.current !== null && endXRef.current !== null) {
      const diff = startXRef.current - endXRef.current;
      if (diff > 50) {
        // 왼쪽으로 스와이프 - 다음 미디어로 이동
        if (currentIndex < mediaItems.length - 1) {
          handleClick(currentIndex + 1);
        }
      } else if (diff < -50) {
        // 오른쪽으로 스와이프 - 이전 미디어로 이동
        if (currentIndex > 0) {
          handleClick(currentIndex - 1);
        }
      }
    }
    setOffset(0);
    setIsDragging(false);
    startXRef.current = null;
    endXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && startXRef.current !== null) {
      endXRef.current = e.touches[0].clientX;
      const moveOffset = endXRef.current - startXRef.current;
      setOffset(moveOffset);
    }
  };

  return (
    <S.GalleryWrapper>
      {/* 선택된 미디어 영역 */}
      <S.MainMediaDisplayWrapper>
        <S.MainMediaDisplayList
          style={{ transform: `translateX(calc(${-currentIndex * 100}% + ${offset}px))` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {mediaItems.map((item, index) => (
            <S.MainMediaDisplay key={item.imageId}>
              {item.isVideo ? (
                <VideoPlayer
                  key={selectedMedia.imageId} // 고유 식별자 사용
                  src={item.imageUrl}
                  onProgressUpdate={handleVideoProgress}
                />
              ) : (
                <S.SelectedMediaImage
                  onClick={handleDisplayClick}
                  src={item.imageUrl}
                  alt={`Media ${index + 1}`}
                />
              )}
            </S.MainMediaDisplay>
          ))}
        </S.MainMediaDisplayList>
      </S.MainMediaDisplayWrapper>

      {/* 미디어 리스트 영역 */}
      <S.ThumbnailListWrapper>
        <S.ThumbnailItemsList>
          {mediaItems.map((item, index) => {
            const { isVideo, imageUrl, imageId } = item;
            return (
              <S.ThumbnailItemContainer
                key={imageId}
                $isSelected={index === currentIndex}
                onClick={() => handleClick(index)}
                ref={index === currentIndex ? selectedThumbnailRef : null}
              >
                {isVideo ? (
                  <ThumbnailVideo uri={imageUrl} progress={index === currentIndex ? progress : 0} />
                ) : (
                  <img src={imageUrl} />
                )}
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
