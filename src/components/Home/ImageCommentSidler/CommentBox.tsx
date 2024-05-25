import { CommentBoxWrapper, CommentText, CommentTextWrapper } from "./styles";

const CommentBox = ({ comment }: { comment?: string }) => {
  if (!comment) return null;
  return (
    <CommentBoxWrapper>
      <CommentTextWrapper>
        <CommentText>
          {comment?.split("\n").map((line) => {
            return (
              <>
                {line}
                <br />
              </>
            );
          })}
        </CommentText>
      </CommentTextWrapper>
    </CommentBoxWrapper>
  );
};

export default CommentBox;
