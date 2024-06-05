import { Flex } from "components/common";
import HomeImageCommentSlider from "components/Home/HomeImageCommentSlider";

import type { ImageListType } from "types/member/main.types";

const PhotoView = ({ imageList }: { imageList: ImageListType[][] }) => {
  return (
    <Flex direction="column" gap={32}>
      {imageList.map((images) => (
        <HomeImageCommentSlider images={images} />
      ))}
    </Flex>
  );
};

export default PhotoView;
