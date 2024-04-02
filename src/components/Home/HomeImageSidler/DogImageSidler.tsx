import { useState } from "react";
import Slider from "react-slick";

import {
  Image,
  ImageShadow,
  SlideIndex,
  SlideIndicator,
  SliderContainer,
  SlideWrapper
} from "./style";

interface ImageSidlerProps {
  images: string[];
}

const DogImageSidler = ({ images }: ImageSidlerProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
    appendDots: (dots: React.ReactNode) => <SlideIndicator> {dots} </SlideIndicator>,
    dotsClass: "dots_custom"
  };

  return (
    <SliderContainer>
      <ImageShadow className="shadow" />
      <Slider {...settings}>
        {images.map((image, index) => (
          <SlideWrapper key={index}>
            <Image src={image} alt="slide" />
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
