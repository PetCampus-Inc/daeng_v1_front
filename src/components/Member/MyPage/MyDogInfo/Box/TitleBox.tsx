import * as S from "../styles";

const TitleBox = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <S.TitleBox>
      <S.Title>내 강아지 정보</S.Title>
      <S.DeleteDogButton onClick={onToggle}>강아지 삭제</S.DeleteDogButton>
    </S.TitleBox>
  );
};

export default TitleBox;
