import Chat from "assets/svg/chat";

import { IconButton } from "./style";

const CommentButton = () => {
  return (
    <IconButton type="button" onClick={() => console.log("코멘트버튼 클릭")}>
      <Chat />
    </IconButton>
  );
};

export default CommentButton;
