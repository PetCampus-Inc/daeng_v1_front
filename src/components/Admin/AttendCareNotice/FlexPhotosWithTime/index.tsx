import { MediaViewModal } from "components/Admin/DogGallery/SinglePicture/MediaViewModal";
import { CommentCarouselLightBoxPopup } from "components/Album/LightBox/CommentCarouselLightBoxPopup";
import { Flex, Text } from "components/common";
import { Image } from "components/common/Image";
import { format } from "date-fns";
import { useGetMainAlbum } from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay";
import { getRelativeTime } from "utils/date";

import * as S from "./styles";

import type { ImageList } from "types/member/main.types";

interface FlexPhotosWithTimeProps {
  dogId: number;
}

const FlexPhotosWithTime = ({ dogId }: FlexPhotosWithTimeProps) => {
  const { data } = useGetMainAlbum({ dogId, date: format(new Date(), "yyyy-MM-dd") });
  const overlay = useOverlay();

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

  // TODO: 사진 없는 경우 디자인 수정
  return (
    <Flex direction="column" gap={28}>
      {!data
        ? "사진이 없습니다"
        : data.map((arr: ImageList[]) => (
            <Flex key={arr[0].imageId} direction="column" gap={8}>
              <Text color="gray_2" typo="body2_16_R">
                {getRelativeTime(arr[0].createdTime)}
              </Text>

              <S.ImageList>
                {arr.map((item: ImageList, index: number) => (
                  <S.StyledImage key={item.imageId}>
                    <Image
                      src={item.imageUri}
                      ratio="1/1"
                      onClick={() => handleImageClick(arr, index)}
                    />
                  </S.StyledImage>
                ))}
              </S.ImageList>
            </Flex>
          ))}
    </Flex>
  );
};

export default FlexPhotosWithTime;
