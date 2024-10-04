import FootRoundIcon from "assets/svg/foot-round-icon";
import { Accordion, Flex, Text } from "components/common";
import { replaceNewline } from "utils/formatter";

import type { ImageList } from "types/member/main.types";

const CommentBox = ({ commentList }: { commentList: ImageList[] }) => {
  if (!commentList[0].comment) return null;

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
        <Text typo="label1_16_R" color="gray_1" whiteSpace="pre-wrap">
          {replaceNewline(commentList[0].comment)}
        </Text>
      </Accordion.Content>
    </Accordion>
  );
};

export default CommentBox;
