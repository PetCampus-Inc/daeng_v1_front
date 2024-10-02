import { Flex, Text, Textarea } from "components/common";
import { useFormContext } from "react-hook-form";

const CommentBox = () => {
  const { register } = useFormContext();
  return (
    <Flex direction="column" gap={8}>
      <Text as="p" typo="body2_16_R" color="black">
        코멘트
      </Text>
      <Textarea
        {...register("comment")}
        placeholder="코멘트를 입력해주세요"
        maxLength={300}
        rows={7}
      />
    </Flex>
  );
};

export default CommentBox;
