import { Box, DragCarousel, Flex, Text } from "components/common";
import { AlbumCheckbox } from "components/common";
import { useOverlay } from "hooks/common/useOverlay";
import { Img } from "styles/StyleModule";
import { getTimeAgo } from "utils/date";

import CommentBox from "./CommentBox";
import { SaveModeButton } from "./SaveModeButton";
import { Dimmed, SlideWrapper } from "./styles";
import { useSelectedImages } from "../hooks/SelectedImageProvider";
import { CommentCarouselLightBoxPopup } from "../LightBox/CommentCarouselLightBoxPopup";

import type { ImageList } from "types/member/main.types";

interface AlbumSlidProps {
  images: ImageList[];
  saveMode: boolean;
  toggleSaveMode: () => void;
}

const AlbumSlide = ({ images, saveMode, toggleSaveMode }: AlbumSlidProps) => {
  const { selectedImgIds, toggleImg, clearSelections } = useSelectedImages();

  const overlay = useOverlay();

  const openLightBoxPopup = (currentSlide: number) =>
    overlay.open(({ isOpen, close }) => (
      <CommentCarouselLightBoxPopup
        isOpen={isOpen}
        onClose={close}
        images={images}
        currentSlide={currentSlide}
      />
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
          <SaveModeButton isSaveMode={saveMode} onToggleMode={handleSaveMode} />
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
              isActive={saveMode && selectedImgIds.has(item.imageId)}
              isSaveMode={saveMode}
            >
              {saveMode && (
                <>
                  <Dimmed />
                  <Box position="absolute" top={8} right={8}>
                    <AlbumCheckbox checked={selectedImgIds.has(item.imageId)} />
                  </Box>
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
