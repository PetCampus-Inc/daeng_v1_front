import { DragCarousel } from "components/common";
import { Img } from "styles/StyleModule";
import { getTimeAgo } from "utils/date";

import { TransmissionTime, CountBadge, Dimmer, SlideWrapper } from "./styles";
import EmptyAlbum from "../Empty/EmptyAlbum";

import type { ImageListType } from "types/member/home.types";

const ImageSlider = ({ images }: { images?: ImageListType[][] }) => {
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
          <TransmissionTime>{getTimeAgo(item[0].createdTime)}</TransmissionTime>
        </SlideWrapper>
      ))}
    </DragCarousel>
  );
};

export default ImageSlider;
