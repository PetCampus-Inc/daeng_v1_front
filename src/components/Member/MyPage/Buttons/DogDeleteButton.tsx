import * as S from "./styles";

const DogDeleteButton = ({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) => {
  return <>{isOpen && <S.DeleteButton onClick={onClick}>삭제</S.DeleteButton>}</>;
};

export default DogDeleteButton;
