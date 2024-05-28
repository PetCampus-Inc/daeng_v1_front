import { useFileDownload } from "hooks/common/useS3";
import { useState } from "react";
import Slider from "react-slick";

import EmptySlide from "./Empty/EmptySlide";
import CommentBox from "./ImageSidler/CommentBox";
import CommentSection from "./ImageSidler/CommentSection";
import ProgressScreen from "./ImageSidler/ProgressScreen";
import SaveSection from "./ImageSidler/SaveSection";
import SliderDots from "./ImageSidler/SliderDots";
import {
  SlideWrapper,
  Image,
  SliderContainer,
  ImageShadow,
  SliderHeader,
  SlideIndex,
  ButtonGroup
} from "./ImageSidler/styles";
import TransmissionTime from "./ImageSidler/TransmissionTime";

import type { ImageListType } from "types/member/home.types";

const HomeImageSlider = ({ images }: { images?: ImageListType[][] }) => {
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
          {currentImage.comment && (
            <CommentSection isOpen={isCommentOpen} handleClick={handleComment} />
          )}

          <SaveSection
            currentImage={currentImage}
            allImages={allImages}
            setTotalFiles={setTotalFiles}
            downloadFile={downloadFile}
          />
        </ButtonGroup>
      </SliderHeader>
      {isLoading && (
        <ProgressScreen progress={progress} currentIdx={downloaded} totalFiles={totalFiles} />
      )}
      <Slider {...settings}>
        {allImages.map((item, index) => (
          <SlideWrapper key={`slide-${item.imageId}-${index}`}>
            <Image src={item.imageUri} alt={`Slide ${index + 1}`} />
            {isCommentVisible(index) && (
              <CommentBox key={`comment-${item.imageId}-${index}`} comment={item.comment} />
            )}
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
