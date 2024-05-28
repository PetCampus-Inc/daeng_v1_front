import FootRoundIcon from "assets/svg/foot-round-icon";
import { Box, Flex, Text } from "components/common";

import type { AlbumDataType } from "types/member/main.types";

const CommentBox = ({ commentList }: { commentList: AlbumDataType[] }) => {
  console.log(commentList);
  return (
    <Box bg="gray_5" paddingBlock={12} paddingInline={12} borderRadius={8}>
      <Flex gap={5.5} align="center" marginBottom={10}>
        <FootRoundIcon w="20" h="20" colorScheme="basic" />
        <Text typo="body2_16_B" color="darkBlack">
          함께 온 코멘트
        </Text>
      </Flex>
      <Text typo="label1_16_R" color="gray_1">
        {commentList[0].comment}
      </Text>
    </Box>
  );
};

export default CommentBox;
