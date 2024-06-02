import CommentButton from "./CommentButton";

interface CommentSectionProps {
  handleClick: () => void;
  isOpen: boolean;
}

const CommentSection = ({ handleClick, isOpen }: CommentSectionProps) => {
  return <CommentButton onClick={handleClick} isOpen={isOpen} />;
};

export default CommentSection;
