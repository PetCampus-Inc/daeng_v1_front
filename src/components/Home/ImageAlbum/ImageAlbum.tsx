import { routes } from "constants/path";

import { Box, Flex, Text } from "components/common";
import { MoreButton } from "components/common/Button/Templates";
import { useNavigate } from "react-router-dom";

import { ImageSlider } from "./ImageSlider";

import type { ImageList } from "types/member/main.types";

interface HomeImageAlbumProps {
  dogInfo: {
    dogName: string;
    dogId: number;
  };
  images?: ImageList[][];
}

export function ImageAlbum({ dogInfo, images }: HomeImageAlbumProps) {
  const navigate = useNavigate();
  const { dogId, dogName } = dogInfo;

  return (
    <Box display="flex" direction="column" mt={40} gap={8}>
      <Flex justify="space-between">
        <Text typo="body2_16_R" color="darkBlack">
          사진 앨범
        </Text>
        {images && (
          <MoreButton
            onClick={() => navigate(routes.member.album.dynamic(`${dogId}?dogName=${dogName}`))}
            typo="body2_16_R"
            iconSize={24}
            iconColorScheme="gray_1"
          >
            전체보기
          </MoreButton>
        )}
      </Flex>
      <ImageSlider images={images} />
    </Box>
  );
}
