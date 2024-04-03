import Chat from "assets/svg/chat";

import { IconButton } from "./style";

interface CommentButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const CommentButton = ({ isOpen, onClick }: CommentButtonProps) => {
  return (
    <IconButton type="button" onClick={onClick} className={isOpen ? "active" : ""}>
      <Chat />
    </IconButton>
  );
};

export default CommentButton;
