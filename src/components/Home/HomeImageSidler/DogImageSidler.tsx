import { useState } from "react";
import React from "react";
import Slider from "react-slick";

import CommentBox from "./CommentBox";
import CommentButton from "./CommentButton";
import SaveOptionDropdown from "./SaveOptionDropdown";
import SliderDots from "./SliderDots";
import {
  ButtonGroup,
  Image,
  ImageShadow,
  SlideIndex,
  SliderContainer,
  SliderHeader,
  SlideWrapper
} from "./styles";
import TransmissionTime from "./TransmissionTime";

interface ImageSidlerProps {
  images: string[];
  comments: string[];
}

const DogImageSidler = ({ images, comments }: ImageSidlerProps) => {
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
          <SaveOptionDropdown url={images} currentIndex={currentIndex} />
        </ButtonGroup>
      </SliderHeader>
      <Slider {...settings}>
        {images.map((image, index) => (
          <SlideWrapper key={index}>
            <Image src={image} alt={`Slide ${index + 1}`} />
            {currentIndex === index && isCommentOpen && <CommentBox comment={comments[index]} />}
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
