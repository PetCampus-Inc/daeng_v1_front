import Chat from "assets/svg/chat";

import { IconButton } from "./styles";

interface CommentButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function CommentButton({ isOpen, onClick }: CommentButtonProps) {
  return (
    <IconButton type="button" onClick={onClick} data-state={isOpen ? "active" : "inactive"}>
      <Chat />
    </IconButton>
  );
}
