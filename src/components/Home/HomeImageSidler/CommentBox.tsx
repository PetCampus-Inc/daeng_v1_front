import { CommentBoxWrapper, CommentText, CommentTextWrapper } from "./styles";

const CommentBox = ({ comment }: { comment?: string }) => {
  return (
    <CommentBoxWrapper>
      <CommentTextWrapper>
        <CommentText>{comment}</CommentText>
      </CommentTextWrapper>
    </CommentBoxWrapper>
  );
};

export default CommentBox;
