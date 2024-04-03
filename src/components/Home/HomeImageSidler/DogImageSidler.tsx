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

  const handleComment = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  const SAVE_OPTIONS: { [key: string]: () => void } = {
    "이 사진만 저장": () => console.log("개별 저장"),
    "전체 저장": () => console.log("전체 저장")
  };

  const handleOptionClick = (option: string) => {
    const action = SAVE_OPTIONS[option];
    if (action) action();
  };

  return (
    <SliderContainer>
      <ImageShadow className="shadow" />
      <SliderHeader>
        <TransmissionTime />
        <ButtonGroup>
          <CommentButton onClick={handleComment} isOpen={isCommentOpen} />
          <SaveOptionDropdown
            options={Object.keys(SAVE_OPTIONS)}
            handleOptionClick={handleOptionClick}
          />
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
