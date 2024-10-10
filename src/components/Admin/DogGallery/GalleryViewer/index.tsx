// GalleryViewer.tsx
import { Text } from "components/common";
import { useState } from "react";

import MediaDisplay from "./MediaDisplay";
import MediaThumbnailGallery from "./MediaThumbnailGallery";
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
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const mediaItems: MediaItem[] = [
    { src: "https://picsum.photos/id/1/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/2/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/3/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/4/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/1/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/2/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/3/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/4/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/4/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/1/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/2/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/3/200/300.jpg", isVideo: false },
    { src: "https://picsum.photos/id/4/200/300.jpg", isVideo: false }
  ];

  return (
    <S.GalleryContainer>
      <MediaDisplay
        src={mediaItems[selectedIndex]?.src}
        isVideo={mediaItems[selectedIndex].isVideo}
      />
      <MediaThumbnailGallery
        items={mediaItems}
        selectedIndex={selectedIndex}
        handleClick={setSelectedIndex}
      />
      <S.IndicatorContainer>
        <Text typo="label1_16_B">5장 중 1번</Text>
      </S.IndicatorContainer>
    </S.GalleryContainer>
  );
};

export default GalleryViewer;
