import { useState } from "react";
import Slider from "react-slick";

import CommentBox from "./HomeImageSidler/CommentBox";
import CommentButton from "./HomeImageSidler/CommentButton";
import SaveOptionDropdown from "./HomeImageSidler/SaveOptionDropdown";
import SliderDots from "./HomeImageSidler/SliderDots";
import {
  SlideWrapper,
  Image,
  SliderContainer,
  ImageShadow,
  SliderHeader,
  ButtonGroup,
  SlideIndex
} from "./HomeImageSidler/styles";
import TransmissionTime from "./HomeImageSidler/TransmissionTime";

import type { ImageList } from "types/member/home.types";

const ImageSlider = ({ images }: { images: ImageList[][] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);

  const handleComment = () => {
    setIsCommentOpen(!isCommentOpen);
  };

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
      <ImageShadow className="shadow" />
      <SliderHeader>
        <TransmissionTime />
        <ButtonGroup>
          <CommentButton onClick={handleComment} isOpen={isCommentOpen} />
          <SaveOptionDropdown />
        </ButtonGroup>
      </SliderHeader>
      <Slider {...settings}>
        {images[images.length - 1].map((item, index) => (
          <SlideWrapper key={index}>
            <Image src={item.imageUri} alt={`Slide ${index + 1}`} />
            {currentIndex === index && isCommentOpen && <CommentBox comment={item.comment} />}
          </SlideWrapper>
        ))}
      </Slider>
      <SlideIndex>
        {currentIndex + 1} / {images.length}
      </SlideIndex>
    </SliderContainer>
  );
};

export default ImageSlider;
