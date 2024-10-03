import { DragCarousel, Text } from "components/common";
import { Img } from "styles/StyleModule";
import { getTimeAgo } from "utils/date";

import { CountBadge, Dimmer, SlideWrapper } from "./styles";
import EmptyAlbum from "../Empty/EmptyAlbum";

import type { ImageList } from "types/member/main.types";

export function ImageSlider({ images }: { images?: ImageList[][] }) {
  if (!images) return <EmptyAlbum />;

  const getCountNum = (num: number) => {
    if (num <= 1) return null;
    return `+${num - 1}`;
  };

  return (
    <DragCarousel gap={12}>
      {images?.map((item, index) => (
        <SlideWrapper key={index} onClick={() => console.log(item[0].imageId)}>
          {getCountNum(item.length) && <CountBadge>{getCountNum(item.length)}</CountBadge>}
          <Dimmer />
          <Img src={item[0].imageUri} alt={`item[0].imageId + 번째 강아지 사진`} />
          <Text as="p" typo="body2_16_B" color="white">
            {getTimeAgo(item[0].createdTime)}
          </Text>
        </SlideWrapper>
      ))}
    </DragCarousel>
  );
}
