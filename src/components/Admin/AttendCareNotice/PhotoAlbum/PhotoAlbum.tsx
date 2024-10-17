import { CommentCarouselLightBoxPopup } from "components/Album/LightBox/CommentCarouselLightBoxPopup";
import { Flex, Text } from "components/common";
import { format } from "date-fns";
import { useGetMainAlbum } from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay";
import { getRelativeTime } from "utils/date";

import { ImageGrid } from "./ImageGrid";

import type { ImageList } from "types/member/main.types";

export function PhotoAlbum({ dogId }: { dogId: number }) {
  const { data } = useGetMainAlbum({
    dogId,
    date: format(new Date(), "yyyy-MM-dd")
  });
  const overlay = useOverlay();

  /** 사진 클릭 핸들러 */
  const handleImageClick = (images: ImageList[], currentIndex: number) => {
    overlay.open(({ isOpen, close }) => (
      <CommentCarouselLightBoxPopup
        isOpen={isOpen}
        onClose={close}
        images={images}
        currentSlide={currentIndex}
      />
    ));
  };

  // FIXME: Empty 화면 디자인 수정 필요!!
  if (!data || data.length === 0) {
    return <Text>전송된 사진이 없습니다</Text>;
  }

  return (
    <Flex direction="column" gap={28}>
      {data.map((items: ImageList[]) => (
        <Flex key={items[0].imageId} direction="column" gap={8}>
          {/* 날짜 */}
          <Text color="gray_2" typo="body2_16_R">
            {getRelativeTime(items[0].createdTime)}
          </Text>

          {/* 사진 그리드 */}
          <ImageGrid items={items} onImageClick={handleImageClick} />
        </Flex>
      ))}
    </Flex>
  );
}
