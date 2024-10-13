import { Text } from "components/common";
import { useOverlay } from "hooks/common/useOverlay";
import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";

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
  const sliderRef = useRef<Slider | null>(null);

  const [progress, setProgress] = useState(0);
  const currentIndex =
    mediaItems.findIndex((media) => media.imageId === selectedMedia.imageId) ?? 0;

  const selectedThumbnailRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (index: number) => {
    onChangeSelected?.(mediaItems[index]);
    sliderRef.current?.slickGoTo(index);
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

  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => onChangeSelected?.(mediaItems[current])
  };

  return (
    <S.GalleryWrapper>
      {/* 선택된 미디어 영역 */}
      <S.MainMediaDisplayWrapper>
        <S.MainMediaDisplayList>
          <Slider ref={sliderRef} {...settings}>
            {mediaItems.map((item) => (
              <S.MainMediaDisplay key={item.imageId} $isVideo={item.isVideo}>
                {item.isVideo ? (
                  <VideoPlayer
                    mediaKey={selectedMedia.imageId}
                    src={item.imageUrl}
                    onProgressUpdate={handleVideoProgress}
                  />
                ) : (
                  <S.SelectedMediaImage onClick={handleDisplayClick} src={item.imageUrl} />
                )}
              </S.MainMediaDisplay>
            ))}
          </Slider>
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
