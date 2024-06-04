import { replaceNewline } from "utils/formatter";

import { CommentBoxWrapper, CommentText, CommentTextWrapper } from "./styles";

const CommentBox = ({ comment }: { comment?: string }) => {
  if (!comment) return null;
  return (
    <CommentBoxWrapper>
      <CommentTextWrapper>
        <CommentText>{replaceNewline(comment)}</CommentText>
      </CommentTextWrapper>
    </CommentBoxWrapper>
  );
};

export default CommentBox;
