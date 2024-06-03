import { Flex } from "components/common";

import AlbumSlide from "./Slide/AlbumSlide";

import type { ImageAlbumType } from "types/member/main.types";

const AlbumView = ({ imageList }: { imageList: ImageAlbumType[][] }) => {
  return (
    <Flex direction="column" gap={32}>
      {imageList.map((images) => (
        <AlbumSlide key={images[0].createdTime} images={images} />
      ))}
    </Flex>
  );
};

export default AlbumView;
