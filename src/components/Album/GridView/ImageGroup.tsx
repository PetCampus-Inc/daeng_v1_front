import { Flex, Text } from "components/common";
import { useOverlay } from "hooks/common/useOverlay";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeGroupIdState, isActiveGroupSelector, selectedImagesState } from "store/images";
import { getFormattedPhotoTime } from "utils/date";

import { ImageGridItem } from "./ImageGridItem";
import { Grid } from "./styles";
import { CommentCarouselLightBoxPopup } from "../LightBox/CommentCarouselLightBoxPopup";
import { SaveModeLightBoxPopup } from "../LightBox/SaveModeLightBoxPopup";
import { SaveModeButton } from "../Slide/SaveModeButton";

import type { ImageList } from "types/member/main.types";

export function ImageGroup({
  currentDate,
  group,
  groupId
}: {
  currentDate: string;
  group: ImageList[];
  groupId: number;
}) {
  const [selectedImages, setSelectedImages] = useRecoilState(selectedImagesState);
  const [_, setActiveGroupId] = useRecoilState(activeGroupIdState);
  const isActiveGroup = useRecoilValue(isActiveGroupSelector(groupId));

  const overlay = useOverlay();

  // FIXME: (캘린더에서) 선택한 날짜가 달라 질 때 전역상태를 reset하기 위해 effect를 사용햇습니다. 더 좋은 방법이 있다면 코멘트 부탁드립니다~
  useEffect(() => {
    /** 선택 날짜 변경시 초기화 */
    setActiveGroupId(null);
    setSelectedImages(new Map());
  }, [currentDate]);

  /** 모드 변경 핸들러 */
  const handleSetMode = () => {
    setActiveGroupId((prev) => (prev === groupId ? null : groupId));
    setSelectedImages(new Map());
  };

  /** 이미지 선택 핸들러 */
  const handleToggleImg = (imageId: number, imageUri: string) => {
    setSelectedImages((prev) => {
      const newMap = new Map(prev);
      newMap.has(imageId) ? newMap.delete(imageId) : newMap.set(imageId, imageUri);
      return newMap;
    });
  };

  /** 라이트박스 열기 */
  const openLightBoxPopup = (currentSlide: number) =>
    overlay.open(({ isOpen, close }) => (
      <CommentCarouselLightBoxPopup
        isOpen={isOpen}
        onClose={close}
        images={group}
        currentSlide={currentSlide}
      />
    ));

  /** 저장모드 일 때 라이트박스 열기 */
  const openSaveModeLightBoxPopup = (currentSlide: number) =>
    overlay.open(({ isOpen, close }) => (
      <SaveModeLightBoxPopup
        isOpen={isOpen}
        onClose={close}
        images={group}
        currentSlide={currentSlide}
      />
    ));

  return (
    <>
      <Flex justify="space-between" px={16} py={10}>
        <Text typo="body2_16_B" color="darkBlack">
          {getFormattedPhotoTime(group[0].createdTime, currentDate)}
        </Text>
        <Flex align="center" gap={10}>
          <Text typo="label2_14_R" color="gray_2">
            {group.length}장
          </Text>
          <SaveModeButton isSaveMode={isActiveGroup} onToggleMode={handleSetMode} />
        </Flex>
      </Flex>
      <Grid>
        {group.map((image, index) => (
          <ImageGridItem
            key={image.imageId}
            image={image}
            index={index}
            isActiveGroup={isActiveGroup}
            isSelected={selectedImages.has(image.imageId)}
            onToggleImg={handleToggleImg}
            openLightBoxPopup={openLightBoxPopup}
            openSaveModeLightBoxPopup={openSaveModeLightBoxPopup}
          />
        ))}
      </Grid>
    </>
  );
}
