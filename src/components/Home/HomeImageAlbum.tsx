import ArrowRightIcon from "assets/svg/arrow-right-icon";
import { Box, Flex, Text } from "components/common";
import SimpleButton from "components/common/Button/SimpleButton";

import ImageSlider from "./ImageAlbumSlider/ImageSlider";
import { MoreButtonStyle } from "./ImageAlbumSlider/styles";

import type { ImageList } from "types/member/home.types";

const HomeImageAlbum = ({ images }: { images?: ImageList[][] }) => {
  return (
    <Box display="flex" direction="column" mt={40} gap={8}>
      <Flex justify="space-between">
        <Text typo="body2_16_R" color="darkBlack">
          사진 앨범
        </Text>
        <SimpleButton
          p={0}
          onClick={() => console.log("클릭")}
          rightAddon={<ArrowRightIcon w="24" h="24" colorScheme="gray_1" />}
          css={MoreButtonStyle}
        >
          전체보기
        </SimpleButton>
      </Flex>
      <ImageSlider images={images} />
    </Box>
  );
};

export default HomeImageAlbum;
