import AddCIcon from "assets/svg/add-c-icon";
import RightArrow from "assets/svg/right-arrow";

import * as S from "./styles";

const MyDogInfo = () => {
  return (
    <S.DogInfoContainer>
      <S.TitleBox>
        <S.Title>내 강아지 정보</S.Title>
        <S.DeleteDogButton>강아지 삭제</S.DeleteDogButton>
      </S.TitleBox>
      <S.MyDogInfoList>
        <S.MyDogCard>
          <S.InfoTextBox>
            <S.DogName>뽀뽀</S.DogName>
            <S.GotoSchoolInfoButton>
              바나나 유치원 잠실점
              <RightArrow />
            </S.GotoSchoolInfoButton>
            <S.CurrentStatusText>2023.12.20 등록</S.CurrentStatusText>
          </S.InfoTextBox>
          <S.MyDogImg
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="my-dog"
          />
        </S.MyDogCard>
        <S.AddMyDogCard>
          <AddCIcon className="addIcon" />
          <S.AddDogButton>강아지 추가하기</S.AddDogButton>
        </S.AddMyDogCard>
      </S.MyDogInfoList>
    </S.DogInfoContainer>
  );
};

export default MyDogInfo;
