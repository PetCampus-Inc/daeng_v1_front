import { Box, Flex, Text } from "components/common";
import { useFileDownload } from "hooks/common/useS3";
import { useState } from "react";
import { getTimeAgo } from "utils/date";

import { CommentButton } from "./CommentButton";
import { ImageCommentSlider } from "./ImageCommentSlider";
import { ProgressScreen } from "./ProgressScreen";
import { SaveButton } from "./SaveButton";
import { InnerShadow, SliderHeader } from "./styles";
import { EmptySlide } from "../Empty/EmptySlide";

import type { ImageList } from "types/member/main.types";

interface ImageCommentProps {
  images?: ImageList[];
}

export function ImageComment({ images }: ImageCommentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [totalFiles, setTotalFiles] = useState(0);
  const { isLoading, progress, downloaded, downloadFile } = useFileDownload();

  if (!images) return <EmptySlide />;

  const currentImage = images[currentIndex];

  const shouldRenderComment = (index: number) => {
    // 현재 슬라이드의 인덱스와 인접한 슬라이드의 인덱스가 모두 comment가 있는 경우, comment를 표시합니다.
    return (
      isCommentOpen &&
      (index === currentIndex ||
        index === (currentIndex - 1 + images.length) % images.length ||
        index === (currentIndex + 1) % images.length)
    );
  };

  return (
    <Box position="relative" radius="rectangle" overflow="hidden">
      <InnerShadow />
      <SliderHeader>
        <Text as="p" typo="body2_16_B" color="white">
          {getTimeAgo(currentImage.createdTime)}
        </Text>
        <Flex gap={12}>
          {currentImage.comment && (
            <CommentButton
              onClick={() => setIsCommentOpen(!isCommentOpen)}
              isOpen={isCommentOpen}
            />
          )}
          <SaveButton
            currentImage={currentImage}
            allImages={images}
            setTotalFiles={setTotalFiles}
            downloadFile={downloadFile}
          />
        </Flex>
      </SliderHeader>
      {isLoading && (
        <ProgressScreen progress={progress} currentIdx={downloaded} totalFiles={totalFiles} />
      )}
      <ImageCommentSlider
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        shouldRenderComment={shouldRenderComment}
      />
    </Box>
  );
}
