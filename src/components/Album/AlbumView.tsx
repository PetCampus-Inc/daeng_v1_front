import { Flex } from "components/common";

import AlbumSlide from "./Slide/AlbumSlide";

import type { AlbumDataType } from "types/member/main.types";

const AlbumView = ({ imageList }: { imageList: AlbumDataType[][] }) => {
  return (
    <Flex direction="column" gap={32}>
      <AlbumSlide imageList={imageList} />
    </Flex>
  );
};

export default AlbumView;
