import ExpandIcon from "assets/svg/expand-icon";
import { AlbumCheckbox, Box } from "components/common";
import { Image } from "components/common/Image";

import { GridItem, GridItemButton, IconContainer } from "./styles";

import type { ImageList } from "types/member/main.types";

interface ImageGridItemProps {
  image: ImageList;
  index: number;
  isActiveGroup: boolean;
  isSelected: boolean;
  onToggleImg: (imageId: number, imageUri: string) => void;
  openLightBoxPopup: (currentSlide: number) => void;
  openSaveModeLightBoxPopup: (currentSlide: number) => void;
}

export function ImageGridItem({
  image,
  index,
  isActiveGroup,
  isSelected,
  onToggleImg,
  openLightBoxPopup,
  openSaveModeLightBoxPopup
}: ImageGridItemProps) {
  return (
    <GridItemButton
      type="button"
      key={image.imageId}
      onClick={(e) => {
        e.stopPropagation();
        isActiveGroup ? onToggleImg(image.imageId, image.imageUri) : openLightBoxPopup(index);
      }}
    >
      <GridItem>
        {isActiveGroup && (
          <Box position="absolute" top={8} right={8}>
            <AlbumCheckbox checked={isSelected} />
          </Box>
        )}
        <Image src={image.imageUri} ratio="1/1" />
        <IconContainer
          onClick={(e) => {
            e.stopPropagation();
            isActiveGroup ? openSaveModeLightBoxPopup(index) : openLightBoxPopup(index);
          }}
        >
          <ExpandIcon />
        </IconContainer>
      </GridItem>
    </GridItemButton>
  );
}
