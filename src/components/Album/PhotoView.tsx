import { Flex } from "components/common";
import HomeImageCommentSlider from "components/Home/HomeImageCommentSlider";

import type { AlbumDataType } from "types/member/main.types";

const PhotoView = ({ imageList }: { imageList: AlbumDataType[][] }) => {
  return (
    <Flex direction="column" gap={32}>
      <HomeImageCommentSlider images={imageList} />
    </Flex>
  );
};

export default PhotoView;
