import * as S from "./styles";
interface IDogDeleteButtonProps {
  onClick: () => void;
  isOpen: boolean;
}
const DogDeleteButton = ({ onClick, isOpen }: IDogDeleteButtonProps) => {
  return <>{isOpen && <S.DeleteButton onClick={onClick}>삭제</S.DeleteButton>}</>;
};

export default DogDeleteButton;
