// GalleryViewer.tsx
import { Text } from "components/common";

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
