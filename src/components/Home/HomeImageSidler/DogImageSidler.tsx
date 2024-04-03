import { useState } from "react";
import React from "react";
import Slider from "react-slick";

import CommentBox from "./CommentBox";
import CommentButton from "./CommentButton";
import SaveButton from "./SaveButton";
import SliderDots from "./SliderDots";
import {
  ButtonGroup,
  Image,
  ImageShadow,
  SlideIndex,
  SliderContainer,
  SliderHeader,
  SlideWrapper
} from "./style";
import TransmissionTime from "./TransmissionTime";

interface ImageSidlerProps {
  images: string[];
}

const DogImageSidler = ({ images }: ImageSidlerProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);

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

  const handleCommentButtonClick = () => {
    setIsCommentOpen(!isCommentOpen); // Toggle the comment box
  };

  console.log(isCommentOpen);

  return (
    <SliderContainer>
      <ImageShadow className="shadow" />
      <SliderHeader>
        <TransmissionTime />
        <ButtonGroup>
          <CommentButton onClick={handleCommentButtonClick} isOpen={isCommentOpen} />
          <SaveButton />
        </ButtonGroup>
      </SliderHeader>
      <Slider {...settings}>
        {images.map((image, index) => (
          <SlideWrapper key={index}>
            <Image src={image} alt="slide" />
            {currentIndex === index && isCommentOpen && <CommentBox index={index} />}
          </SlideWrapper>
        ))}
      </Slider>
      <SlideIndex>
        {currentIndex + 1} / {images.length}
      </SlideIndex>
    </SliderContainer>
  );
};

export default DogImageSidler;
