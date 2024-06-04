import { useFileDownload } from "hooks/common/useS3";
import { useState } from "react";
import Slider from "react-slick";

import EmptySlide from "./Empty/EmptySlide";
import CommentBox from "./ImageCommentSidler/CommentBox";
import CommentSection from "./ImageCommentSidler/CommentSection";
import ProgressScreen from "./ImageCommentSidler/ProgressScreen";
import SaveSection from "./ImageCommentSidler/SaveSection";
import SliderDots from "./ImageCommentSidler/SliderDots";
import {
  SlideWrapper,
  Image,
  SliderContainer,
  ImageShadow,
  SliderHeader,
  SlideIndex,
  ButtonGroup
} from "./ImageCommentSidler/styles";
import TransmissionTime from "./ImageCommentSidler/TransmissionTime";

import type { ImageListType } from "types/member/main.types";

const HomeImageCommentSlider = ({ images }: { images?: ImageListType[] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const { isLoading, progress, downloaded, downloadFile } = useFileDownload();

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

  const currentImage = images[currentIndex];
  const isCommentVisible = (index: number) => {
    return (
      isCommentOpen &&
      (index === currentIndex ||
        index === (currentIndex - 1 + images.length) % images.length ||
        index === (currentIndex + 1) % images.length)
    );
  };

  return (
    <SliderContainer>
      <ImageShadow className="shadow" />
      <SliderHeader>
        <TransmissionTime time={currentImage.createdTime} />
        <ButtonGroup>
          {currentImage.comment && (
            <CommentSection isOpen={isCommentOpen} handleClick={handleComment} />
          )}

          <SaveSection
            currentImage={currentImage}
            allImages={images}
            setTotalFiles={setTotalFiles}
            downloadFile={downloadFile}
          />
        </ButtonGroup>
      </SliderHeader>
      {isLoading && (
        <ProgressScreen progress={progress} currentIdx={downloaded} totalFiles={totalFiles} />
      )}
      <Slider {...settings}>
        {images.map((item, index) => (
          <SlideWrapper key={`slide-${item.imageId}-${index}`}>
            <Image src={item.imageUri} alt={`Slide ${index + 1}`} />
            {isCommentVisible(index) && (
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
};

export default HomeImageCommentSlider;
