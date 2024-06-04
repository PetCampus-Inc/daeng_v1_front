import { DragCarousel, Flex, Text } from "components/common";
import { AlbumCheckbox } from "components/common";
import { useOverlay } from "hooks/common/useOverlay";
import { Img } from "styles/StyleModule";
import { getTimeAgo } from "utils/date";

import CommentBox from "./CommentBox";
import SaveButton from "./SaveButton";
import { Dimmer, SlideWrapper } from "./styles";
import { useSelectedImages } from "../context/SelectedImageProvider";
import LightBoxPopup from "../LightBoxPopup";

import type { ImageListType } from "types/member/main.types";

interface AlbumSlidProps {
  images: ImageListType[];
  saveMode: boolean;
  toggleSaveMode: () => void;
}

const AlbumSlide = ({ images, saveMode, toggleSaveMode }: AlbumSlidProps) => {
  const { selectedImgIds, toggleImg, clearSelections } = useSelectedImages();

  const overlay = useOverlay();

  const openLightBoxPopup = (currentSlide: number) =>
    overlay.open(({ isOpen, close }) => (
      <LightBoxPopup isOpen={isOpen} close={close} images={images} currentSlide={currentSlide} />
    ));

  const handleSaveMode = () => {
    toggleSaveMode();
    clearSelections();
  };

  return (
    <Flex direction="column" gap={12}>
      <Flex direction="column" gap={4}>
        <Flex justify="space-between">
          <Text typo="body2_16_R" color="darkBlack">
            {getTimeAgo(images[0].createdTime)}
          </Text>
          <SaveButton isSaveMode={saveMode} handleSaveMode={handleSaveMode} />
        </Flex>
        <DragCarousel gap={8}>
          {images.map((item, index) => (
            <SlideWrapper
              onClick={(e) => {
                e.stopPropagation();
                if (saveMode) {
                  toggleImg(item.imageId, item.imageUri);
                } else {
                  openLightBoxPopup(index);
                }
              }}
              isActive={saveMode && !!selectedImgIds.has(item.imageId)}
              isSaveMode={saveMode}
            >
              {saveMode && (
                <>
                  <Dimmer />
                  <AlbumCheckbox checked={selectedImgIds.has(item.imageId)} />
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
