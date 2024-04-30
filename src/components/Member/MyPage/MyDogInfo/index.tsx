import * as S from "./styles";
import AddMyDogCard from "../Cards/AddMyDogCard";
import MyDogCard from "../Cards/MyDogCard";

const MyDogInfo = () => {
  return (
    <S.DogInfoContainer>
      <S.TitleBox>
        <S.Title>내 강아지 정보</S.Title>
        <S.DeleteDogButton>강아지 삭제</S.DeleteDogButton>
      </S.TitleBox>
      <S.MyDogInfoList>
        <MyDogCard />
        <AddMyDogCard />
      </S.MyDogInfoList>
    </S.DogInfoContainer>
  );
};

export default MyDogInfo;
