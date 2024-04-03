import { CommentBoxWrapper, CommentText, CommentTextWrapper } from "./style";

const comments = [
  "첫 번째 강아지에 대한 댓글입니다.",
  "또리는요 오늘 즐거운 시간을 보냈어요. 밥도 아주 잘 먹었구요. 간식도 아주 많이 먹었어요. 또리는  수영장을 좋아해요. 물에 뛰어들어서 놀아요. 또리는 산책을 좋아해요. 산책을 하면서 많은 친구들을 만나요. 또리는 놀이터를 좋아해요. 놀이터에서 많은 친구들과 놀아요. 또리는 먹는 것을 좋아해요. 먹는 것을 보면 아주 기뻐해요.",
  "세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다."
];

const CommentBox = ({ index }: { index: number }) => {
  const comment = comments[index];

  return (
    <CommentBoxWrapper>
      <CommentTextWrapper>
        <CommentText>{comment}</CommentText>
      </CommentTextWrapper>
    </CommentBoxWrapper>
  );
};

export default CommentBox;
