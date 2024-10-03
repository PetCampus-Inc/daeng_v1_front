import { replaceNewline } from "utils/formatter";

import { CommentBoxWrapper, CommentText, CommentTextWrapper } from "./styles";

export function CommentBox({ comment }: { comment: string }) {
  return (
    <CommentBoxWrapper>
      <CommentTextWrapper>
        <CommentText>{replaceNewline(comment)}</CommentText>
      </CommentTextWrapper>
    </CommentBoxWrapper>
  );
}
