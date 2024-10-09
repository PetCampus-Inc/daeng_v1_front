// GalleryViewer.tsx
import { Text } from "components/common";
import React from "react";

import * as S from "./styles";

interface MediaItem {
  src: string;
  isVideo: boolean;
}

interface GalleryProps {
  mediaItems: MediaItem[];
  selectedIndex: number;
  onThumbnailClick: (index: number) => void;
}

// 전체 Gallery 컴포넌트
const GalleryViewer = () => {
  const mediaItems: MediaItem[] = [
    { src: "https://picsum.photos/id/1/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/2/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/3/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/4/200/300.jpg", isVideo: false }
  ];
  const selectedIndex = 2;

  return (
    <S.GalleryContainer>
      <MediaDisplay
        src={mediaItems[selectedIndex]?.src}
        isVideo={mediaItems[selectedIndex].isVideo}
      />

      <MediaThumbnailGallery items={mediaItems} selectedIndex={selectedIndex} />
    </S.GalleryContainer>
  );
};

export default GalleryViewer;

// MediaDisplay 컴포넌트
interface MediaDisplayProps {
  src: string;
  isVideo: boolean;
}

const MediaDisplay: React.FC<MediaDisplayProps> = ({ src, isVideo }) => (
  <S.DisplayContainer>
    {isVideo ? <video src={src} controls /> : <S.DisplayMedia src={src} alt="Main Display" />}
  </S.DisplayContainer>
);

// MediaThumbnailGallery 컴포넌트
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
    <MediaIndicator totalItems={5} currentIndex={3} />
  </S.ThumbnailContainer>
);

// MediaIndicator 컴포넌트
interface MediaIndicatorProps {
  totalItems: number;
  currentIndex: number;
}

const MediaIndicator: React.FC<MediaIndicatorProps> = ({ totalItems, currentIndex }) => (
  <S.IndicatorContainer>
    <Text typo="label1_16_B">
      {totalItems}장 중 {currentIndex + 1}번
    </Text>
  </S.IndicatorContainer>
);
