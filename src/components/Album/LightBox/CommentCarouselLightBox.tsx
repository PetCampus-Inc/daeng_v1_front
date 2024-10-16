import CloseIcon from "assets/svg/x-circle-icon";
import { VideoPlayer } from "components/common";
import { Arrows } from "components/common/LightBox";
import { ProgressScreen } from "components/Home/ImageComment/ProgressScreen";
import { motion } from "framer-motion";
import { useSaveMedia } from "hooks/common/useSaveMedia";
import { useState } from "react";
import Slider from "react-slick";
import { dialogAnimationVariants } from "styles/foundations/animation";

import CommentBox from "./CommentBox";
import { SaveButton } from "./SaveOptionDropdown";
import {
  SlideWrapper,
  SliderContainer,
  SliderHeader,
  Image,
  SlideIndex,
  SlideIndexWrapper,
  OverlayContainer,
  OverlayWrapper
} from "./styles";
import { Text } from "../../common/Text";

type ImageListType = {
  imageId: number;
  imageUri: string;
  comment?: string;
};

interface CarouselLightBoxProps {
  images: ImageListType[];
  onClose: () => void;
  currentSlide: number;
}

export const CommentCarouselLightBox = ({
  images,
  onClose,
  currentSlide
}: CarouselLightBoxProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(currentSlide);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const { saveMedia, progress, isLoading, currentIndex: downloaded } = useSaveMedia();

  const currentImage = images[currentIndex];
  const isVideo = currentImage.imageUri.endsWith("mp4");

  const settings = {
    initialSlide: currentSlide,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: never, newIndex: number) => {
      setCurrentIndex(newIndex);
    },
    nextArrow: <Arrows position="next" />,
    prevArrow: <Arrows position="prev" />
  };

  return (
    <OverlayContainer
      as={motion.div}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={dialogAnimationVariants}
    >
      <OverlayWrapper>
        <SliderContainer>
          {isLoading && (
            <ProgressScreen progress={progress} currentIdx={downloaded} totalFiles={totalFiles} />
          )}
          <SliderHeader>
            <SaveButton
              currentImage={currentImage}
              allImages={images}
              setTotalFiles={setTotalFiles}
              onDownload={saveMedia}
            />
            <button type="button" onClick={onClose}>
              <CloseIcon colorScheme="black" w={31} h={31} opacity={0.7} />
            </button>
          </SliderHeader>
          <Slider {...settings}>
            {images.map((item, index) => (
              <SlideWrapper key={`slide-${item.imageId}-${index}`}>
                {isVideo ? (
                  <VideoPlayer src={item.imageUri} />
                ) : (
                  <Image src={item.imageUri} alt={`Slide ${index + 1}`} />
                )}
              </SlideWrapper>
            ))}
          </Slider>
          <SlideIndexWrapper>
            <SlideIndex>
              <Text typo="caption1_12_R" color="white">
                {currentIndex + 1}/{images.length}
              </Text>
            </SlideIndex>
          </SlideIndexWrapper>
        </SliderContainer>
        {images[0].comment && <CommentBox comment={images[0].comment} />}
      </OverlayWrapper>
    </OverlayContainer>
  );
};

export type { ImageListType, CarouselLightBoxProps };
