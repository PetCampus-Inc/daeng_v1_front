import { useToggle } from "hooks/common/useToggle";

import * as S from "./styles";
import AddMyDogCard from "../Cards/AddMyDogCard";
import MyDogCard from "../Cards/MyDogCard";
import RejectedCard from "../Cards/RejectedCard";
import WaitingCard from "../Cards/WaitingCard";

const MyDogInfo = () => {
  const { isOpen, toggle } = useToggle();
  return (
    <S.DogInfoContainer>
      <S.TitleBox>
        <S.Title>내 강아지 정보</S.Title>
        <S.DeleteDogButton onClick={toggle}>강아지 삭제</S.DeleteDogButton>
      </S.TitleBox>
      <div>
        <S.MyDogInfoList>
          <MyDogCard isOpen={isOpen} />
          <AddMyDogCard />
          {/* <RejectedCard />
          <WaitingCard /> */}
        </S.MyDogInfoList>
      </div>
    </S.DogInfoContainer>
  );
};

export default MyDogInfo;
