import { DragCarousel, Flex, Text } from "components/common";
import { Checkbox } from "components/common";
import { useOverlay } from "hooks/common/useOverlay";
import { useCallback, useState } from "react";
import { Img } from "styles/StyleModule";
import { getTimeAgo } from "utils/date";

import CommentBox from "./CommentBox";
import SaveButton from "./SaveButton";
import { Dimmer, SlideWrapper } from "./styles";
import LightBoxPopup from "../LightBoxPopup";

import type { ImageAlbumType } from "types/member/main.types";

const AlbumSlide = ({ images }: { images: ImageAlbumType[] }) => {
  const [isSaveMode, setSaveMode] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState(new Set());

  const overlay = useOverlay();

  const handleSaveMode = () => {
    setSaveMode(!isSaveMode);
    if (!isSaveMode) {
      setSelectedImages(new Set());
    }
  };

  const handleSelectImage = useCallback((imageId: number) => {
    setSelectedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  }, []);

  const openLightBoxPopup = (currentSlide: number) =>
    overlay.open(({ isOpen, close }) => (
      <LightBoxPopup isOpen={isOpen} close={close} images={images} currentSlide={currentSlide} />
    ));

  return (
    <Flex direction="column" gap={12}>
      <Flex direction="column" gap={4}>
        <Flex justify="space-between">
          <Text typo="body2_16_R" color="darkBlack">
            {getTimeAgo(images[0].createdTime)}
          </Text>
          <SaveButton isSaveMode={isSaveMode} handleSaveMode={handleSaveMode} />
        </Flex>
        <DragCarousel gap={8}>
          {images.map((item, index) => (
            <SlideWrapper
              onClick={() => !isSaveMode && openLightBoxPopup(index)}
              active={selectedImages.has(item.imageId)}
              isSaveMode={isSaveMode}
            >
              {isSaveMode && (
                <>
                  <Dimmer onClick={(e) => e.stopPropagation()} />
                  <Checkbox
                    isChecked={selectedImages.has(item.imageId)}
                    onChange={() => handleSelectImage(item.imageId)}
                  />
                </>
              )}
              <Img src={item.imageUri} alt={`${item.imageId} + 번째 강아지 사진`} />
            </SlideWrapper>
          ))}
        </DragCarousel>
      </Flex>
      <CommentBox commentList={images} />
    </Flex>
  );
};

export default AlbumSlide;
