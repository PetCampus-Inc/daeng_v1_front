import { useState } from "react";
import Slider from "react-slick";

import EmptySlide from "./empty/EmptySlide";
import CommentBox from "./ImageSidler/CommentBox";
import CommentButton from "./ImageSidler/CommentButton";
import SaveOptionDropdown from "./ImageSidler/SaveOptionDropdown";
import SliderDots from "./ImageSidler/SliderDots";
import {
  SlideWrapper,
  Image,
  SliderContainer,
  ImageShadow,
  SliderHeader,
  ButtonGroup,
  SlideIndex
} from "./ImageSidler/styles";
import TransmissionTime from "./ImageSidler/TransmissionTime";

import type { ImageList } from "types/member/home.types";

const HomeImageSlider = ({ images }: { images?: ImageList[][] }) => {
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

  if (!images) return <EmptySlide />;

  // 모든 이미지를 하나의 배열로 합칩니다.
  const allImages = images.flat();
  const currentImage = allImages[currentIndex];

  const isCommentVisible = (index: number) => {
    return (
      isCommentOpen &&
      (index === currentIndex ||
        index === (currentIndex - 1 + allImages.length) % allImages.length ||
        index === (currentIndex + 1) % allImages.length)
    );
  };

  return (
    <SliderContainer>
      <ImageShadow className="shadow" />
      <SliderHeader>
        <TransmissionTime time={currentImage.createdTime} />
        <ButtonGroup>
          {currentImage.comment && <CommentButton onClick={handleComment} isOpen={isCommentOpen} />}
          <SaveOptionDropdown />
        </ButtonGroup>
      </SliderHeader>
      <Slider {...settings}>
        {allImages.map((item, index) => (
          <SlideWrapper key={index}>
            <Image src={item.imageUri} alt={`Slide ${index + 1}`} />
            {isCommentVisible(index) && <CommentBox comment={item.comment} />}
          </SlideWrapper>
        ))}
      </Slider>
      <SlideIndex>
        {currentIndex + 1} / {allImages.length}
      </SlideIndex>
    </SliderContainer>
  );
};

export default HomeImageSlider;
