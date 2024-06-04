import { CommentText, CommentTextWrapper } from "components/Home/ImageCommentSidler/styles";
import styled from "styled-components";
import { replaceNewline } from "utils/formatter";

const CommentBox = ({ comment }: { comment: string }) => {
  return (
    <CommentBoxWrapper>
      <CommentTextWrapper>
        <CommentText>{replaceNewline(comment)}</CommentText>
      </CommentTextWrapper>
    </CommentBoxWrapper>
  );
};

export default CommentBox;

const CommentBoxWrapper = styled.div`
  position: relative;
  display: flex;
  max-height: 120px;

  margin-top: 0.75rem;
  padding: 0.75rem 0.625rem;
  gap: 0.625rem;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  opacity: 0.65;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: url("/images/double-quotes-icon.svg") no-repeat center center;
    background-size: contain;
    width: 0.75rem;
    height: 0.75rem;
  }

  &::before {
    top: 0.75rem;
    left: 0.62rem;
  }

  &::after {
    bottom: 0.75rem;
    right: 0.62rem;
    transform: rotate(180deg);
  }
`;
