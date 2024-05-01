import { useToggle } from "hooks/common/useToggle";

import * as S from "./styles";
import AddMyDogCard from "../Cards/AddMyDogCard";
import MyDogCard from "../Cards/MyDogCard";
import RejectedCard from "../Cards/RejectedCard";
import WaitingCard from "../Cards/WaitingCard";

const MyDogInfo = () => {
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
      {mockupData.length <= 1 ? (
        <S.MyDogInfoList>
          {mockupData.map((item) => (
            <MyDogCard
              key={item.dogId}
              id={item.dogId}
              isOpen={isOpen}
              dogName={item.dogName}
              schoolInfo={"바나나 유치원 잠실점"}
              createdTime={"2023.12.20"}
              profileUri={item.profileUri}
              dogLength={mockupData.length} //* 기능 작업을 위한 임시 데이터
            />
          ))}
          <AddMyDogCard />
        </S.MyDogInfoList>
      ) : (
        <S.CarouselSlider {...settings}>
          {mockupData.map((item) => (
            <MyDogCard
              key={item.dogId}
              id={item.dogId}
              isOpen={isOpen}
              dogName={item.dogName}
              schoolInfo={"바나나 유치원 잠실점"}
              createdTime={"2023.12.20"}
              profileUri={item.profileUri}
              dogLength={mockupData.length} //* 기능 작업을 위한 임시 데이터
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

//* 기능 작업을 위한 목업 데이터
const mockupData = [
  {
    dogId: 1,
    dogName: "뽀뽀",
    dogGender: "남",
    dogSize: "SMALL",
    breedId: 1,
    breedName: "사모예드",
    dogBirthDate: "2024-04-30",
    neutralization: "NEUTERED",
    allergyDisease: "string",
    vaccination: "VACCINATED",
    profileUri:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fileList: [
      {
        imageId: 0,
        imageUri:
          "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageType: "IMAGE",
        comment: "string",
        createdTime: "2024-04-30T15:18:07.028Z"
      }
    ],
    pickDropRequest: "RUNNING",
    pickDropType: "RUNNING",
    pickDropMemo: "string",
    member: {
      memberId: 1,
      memberName: "박유빈",
      memberGender: "남자",
      address: "서울 중구 덕수궁길 150",
      phoneNumber: "010-1234-1234",
      emergencyNumber: "010-1234-1234",
      relation: "아빠"
    },
    dogMemo: "string"
  },
  {
    dogId: 2,
    dogName: "뿌뿌",
    dogGender: "여",
    dogSize: "SMALL",
    breedId: 2,
    breedName: "사모예드",
    dogBirthDate: "2024-04-30",
    neutralization: "NEUTERED",
    allergyDisease: "string",
    vaccination: "VACCINATED",
    profileUri:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fileList: [
      {
        imageId: 0,
        imageUri:
          "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageType: "IMAGE",
        comment: "string",
        createdTime: "2024-04-30T15:18:07.028Z"
      }
    ],
    pickDropRequest: "RUNNING",
    pickDropType: "RUNNING",
    pickDropMemo: "string",
    member: {
      memberId: 1,
      memberName: "박유빈",
      memberGender: "남자",
      address: "서울 중구 덕수궁길 150",
      phoneNumber: "010-1234-1234",
      emergencyNumber: "010-1234-1234",
      relation: "아빠"
    },
    dogMemo: "string"
  }
];
