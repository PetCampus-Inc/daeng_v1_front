import { DragCarousel, Flex, Text } from "components/common";
import { useOverlay } from "hooks/common/useOverlay";
import { useState } from "react";
import { Img } from "styles/StyleModule";
import { getTimeAgo } from "utils/date";

import CommentBox from "./CommentBox";
import SaveButton from "./SaveButton";
import { SlideWrapper } from "./styles";
import LightBoxPopup from "../LightBoxPopup";

import type { ImageAlbumType } from "types/member/main.types";

const AlbumSlide = ({ imageList }: { imageList: ImageAlbumType[][] }) => {
  const [isSaveMode, setSaveMode] = useState<boolean>(false);
  const overlay = useOverlay();

  const handleSaveMode = () => {
    setSaveMode(!isSaveMode);
  };

  const openLightBoxPopup = ({
    images,
    currentSlide
  }: {
    images: ImageAlbumType[];
    currentSlide: number;
  }) =>
    overlay.open(({ isOpen, close }) => (
      <LightBoxPopup isOpen={isOpen} close={close} images={images} currentSlide={currentSlide} />
    ));

  return (
    <>
      {imageList.map((images) => (
        <Flex direction="column" gap={16}>
          <Flex direction="column" gap={4}>
            <Flex justify="space-between">
              <Text typo="body2_16_R" color="darkBlack">
                {getTimeAgo(images[0].createdTime)}
              </Text>
              <SaveButton isSaveMode={isSaveMode} handleSaveMode={handleSaveMode} />
            </Flex>
            <DragCarousel gap={12}>
              {images.map((item, index) => (
                <SlideWrapper onClick={() => openLightBoxPopup({ images, currentSlide: index })}>
                  <Img src={item.imageUri} alt={`${item.imageId} + 번째 강아지 사진`} />
                </SlideWrapper>
              ))}
            </DragCarousel>
          </Flex>
          <CommentBox commentList={images} />
        </Flex>
      ))}
    </>
  );
};

export default AlbumSlide;
