import FootRoundIcon from "assets/svg/foot-round-icon";
import { Accordion, Flex, Text } from "components/common";

import type { ImageAlbumType } from "types/member/main.types";

const CommentBox = ({ commentList }: { commentList: ImageAlbumType[] }) => {
  return (
    <Accordion>
      <Accordion.Title>
        <Flex gap={5.5} align="center">
          <FootRoundIcon w="20" h="20" colorScheme="basic" />
          <Text typo="body2_16_B" color="darkBlack">
            함께 온 코멘트
          </Text>
        </Flex>
      </Accordion.Title>
      <Accordion.Content>
        <Text typo="label1_16_R" color="gray_1">
          {commentList[0].comment}
        </Text>
      </Accordion.Content>
    </Accordion>
  );
};

export default CommentBox;
