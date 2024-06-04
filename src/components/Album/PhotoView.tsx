import { Flex } from "components/common";
import HomeImageCommentSlider from "components/Home/HomeImageCommentSlider";

import type { ImageAlbumType } from "types/member/main.types";

const PhotoView = ({ imageList }: { imageList: ImageAlbumType[][] }) => {
  return (
    <Flex direction="column" gap={32}>
      <HomeImageCommentSlider images={imageList} />
    </Flex>
  );
};

export default PhotoView;
