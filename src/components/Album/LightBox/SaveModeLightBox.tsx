import CloseIcon from "assets/svg/x-circle-icon";
import { AlbumCheckbox, Box } from "components/common";
import { Arrows } from "components/common/LightBox";
import { motion } from "framer-motion";
import { useState } from "react";
import Slider from "react-slick";
import { useRecoilState } from "recoil";
import { type ImageListType, selectedImagesState } from "store/images";
import { dialogAnimationVariants } from "styles/foundations/animation";

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

interface SaveModeLightBoxProps {
  images: ImageListType[];
  onClose: () => void;
  currentSlide: number;
}

export const SaveModeLightBox = ({ images, onClose, currentSlide }: SaveModeLightBoxProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(currentSlide);
  const [selectedImages, setSelectedImages] = useRecoilState(selectedImagesState);

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

  const handleToggleImg = (imageId: number, imageUri: string) => {
    setSelectedImages((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(imageId)) {
        newMap.delete(imageId);
      } else {
        newMap.set(imageId, imageUri);
      }
      return newMap;
    });
  };

  const isSelected = selectedImages.has(images[currentIndex].imageId);

  return (
    <OverlayContainer
      as={motion.div}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={dialogAnimationVariants}
    >
      <OverlayWrapper>
        <SliderContainer checked={isSelected}>
          <SliderHeader>
            <Box position="absolute" top={12} left={12}>
              <AlbumCheckbox
                checked={isSelected}
                onChange={() =>
                  handleToggleImg(images[currentIndex].imageId, images[currentIndex].imageUri)
                }
              />
            </Box>
            <button type="button" onClick={onClose}>
              <CloseIcon colorScheme="black" w={31} h={31} opacity={0.7} />
            </button>
          </SliderHeader>
          <Slider {...settings}>
            {images.map((item, index) => (
              <SlideWrapper key={`slide-${item.imageId}-${index}`}>
                <Image src={item.imageUri} alt={`Slide ${index + 1}`} />
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
      </OverlayWrapper>
    </OverlayContainer>
  );
};
