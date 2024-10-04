import React from "react";
import Slider from "react-slick";

import { CommentBox } from "./CommentBox";
import { SliderDots } from "./SliderDots";
import { SlideWrapper, Image, SliderContainer, SlideIndex } from "./styles";

import type { ImageList } from "types/member/main.types";

interface ImageCommentSliderProps {
  images: ImageList[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  shouldRenderComment: (index: number) => boolean;
}

export function ImageCommentSlider({
  images,
  currentIndex,
  setCurrentIndex,
  shouldRenderComment
}: ImageCommentSliderProps) {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: never, newIndex: number) => {
      setCurrentIndex(newIndex);
    },
    appendDots: (dots: React.ReactElement[]) => (
      <SliderDots dots={dots} numDotsToShow={5} dotWidth={20} />
    )
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        {images.map((item, index) => (
          <SlideWrapper key={`slide-${item.imageId}-${index}`}>
            <Image src={item.imageUri} alt={`Slide ${index + 1}`} />
            {shouldRenderComment(index) && item.comment && (
              <CommentBox key={`comment-${item.imageId}-${index}`} comment={item.comment} />
            )}
          </SlideWrapper>
        ))}
      </Slider>
      <SlideIndex>
        {currentIndex + 1} / {images.length}
      </SlideIndex>
    </SliderContainer>
  );
}
