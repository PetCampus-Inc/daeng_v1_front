import { DragCarousel, Flex, Text } from "components/common";
import { AlbumCheckbox } from "components/common";
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

  const toggleSelection = (imageId: number) => {
    const isSelected = selectedImages.has(imageId);
    handleSelectImage(imageId, !isSelected);
  };

  const handleSelectImage = useCallback((imageId: number, checked: boolean) => {
    setSelectedImages((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(imageId);
      } else {
        newSet.delete(imageId);
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
              onClick={(e) => {
                e.stopPropagation();
                if (isSaveMode) {
                  toggleSelection(item.imageId);
                } else {
                  openLightBoxPopup(index);
                }
              }}
              isActive={isSaveMode && !!selectedImages.has(item.imageId)}
              isSaveMode={isSaveMode}
            >
              {isSaveMode && (
                <>
                  <Dimmer />
                  <AlbumCheckbox checked={selectedImages.has(item.imageId)} />
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
