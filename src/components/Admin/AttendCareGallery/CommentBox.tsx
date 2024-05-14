import { Flex, Text } from "components/common";
import TextArea from "components/common/TextArea";
import { useFormContext } from "react-hook-form";

const CommentBox = () => {
  const { register } = useFormContext();
  return (
    <Flex direction="column" gap={8}>
      <Text tag="p" typo="body2_16_R" color="black">
        코멘트
      </Text>
      <TextArea
        {...register("comment")}
        placeholder="코멘트를 입력해주세요"
        maxLength={300}
        rows={7}
      />
    </Flex>
  );
};

export default CommentBox;
