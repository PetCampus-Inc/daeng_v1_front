import { useToggle } from "hooks/common/useToggle";
import { IMemberInfo } from "types/member/home.types";

import * as S from "./styles";
import AddMyDogCard from "../Cards/AddMyDogCard";
import MyDogCard from "../Cards/MyDogCard";
import RejectedCard from "../Cards/RejectedCard";
import WaitingCard from "../Cards/WaitingCard";

interface MemberInfoProps {
  data: IMemberInfo;
}

const MyDogInfo = ({ data }: MemberInfoProps) => {
  const { isOpen, toggle } = useToggle();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.3,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <S.DogInfoContainer>
      <S.TitleBox>
        <S.Title>내 강아지 정보</S.Title>
        <S.DeleteDogButton onClick={toggle}>강아지 삭제</S.DeleteDogButton>
      </S.TitleBox>
      {data.doglist.length <= 1 ? (
        <S.MyDogInfoList>
          {data.doglist.map((item) => (
            <MyDogCard
              key={item.dogName}
              dogId={item.dogId}
              isOpen={isOpen}
              dogName={item.dogName}
              schoolInfo={item.schoolName}
              registeredDate={item.registeredDate.map((item) => String(item))}
              profileUri={
                //FIXME dogProfile url 연결 필요
                !item.dogProfile
                  ? item.dogProfile
                  : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              status={item.status}
              dogLength={data.doglist.length}
            />
          ))}
          <AddMyDogCard />
        </S.MyDogInfoList>
      ) : (
        <S.CarouselSlider {...settings}>
          {data.doglist.map((item) => (
            <MyDogCard
              key={item.dogName}
              dogId={item.dogId}
              isOpen={isOpen}
              dogName={item.dogName}
              schoolInfo={item.schoolName}
              registeredDate={item.registeredDate.map((item) => String(item))}
              profileUri={
                //FIXME dogProfile url 연결 필요
                !item.dogProfile
                  ? item.dogProfile
                  : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              status={item.status}
              dogLength={data.doglist.length}
            />
          ))}
          <AddMyDogCard />
          {/* <RejectedCard />
              <WaitingCard /> */}
        </S.CarouselSlider>
      )}
    </S.DogInfoContainer>
  );
};

export default MyDogInfo;
