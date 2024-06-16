import { useGetEnrollmentStatus } from "hooks/api/admin/enroll";
import useMemberRejected from "hooks/api/member/useMemberRejected";
import { useLocalStorageValue } from "hooks/common/useLocalStorage";
import { useToggle } from "hooks/common/useToggle";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IEnrollmentStatus } from "types/member/enrollment.types";
import { IMemberInfo } from "types/member/main.types";

import * as S from "./styles";
import AddMyDogCard from "../Cards/AddMyDogCard";
import MyDogCard from "../Cards/MyDogCard";
import RejectedCard from "../Cards/RejectedCard";
import WaitingCard from "../Cards/WaitingCard";

interface MemberInfoProps {
  data: IMemberInfo;
}

const MyDogInfo = ({ data }: MemberInfoProps) => {
  const { pathname } = useLocation();
  const { isOpen, toggle } = useToggle();
  const storageEnrollmentIdArr = useLocalStorageValue<number[]>("ENROLLMENT_FORM_ID") || [];
  const { data: approvalDeniedDogArr } = useGetEnrollmentStatus(storageEnrollmentIdArr);
  const approvalDeniedDog = approvalDeniedDogArr.filter((dog) => dog.status === "APPROVAL_DENIED");
  console.log("approvalDeniedDog", approvalDeniedDogArr);

  const {
    rejectedDogs,
    IS_REJECTED,
    VISIT_PATH_NAME,
    updataStoragePendingDogs,
    removeStorageDatas,
    getPendingDogs,
    getRejectedDogs,
    STORAGE_KEY
  } = useMemberRejected();

  useEffect(() => {
    updataStoragePendingDogs(); // storage data update
    getPendingDogs({ data }); // pending data
    getRejectedDogs({ data }); // rejected data
  }, [data]);

  useEffect(() => {
    // 첫 방문시 mypage path localStorage에 저장
    if (IS_REJECTED === "true" && !VISIT_PATH_NAME) {
      localStorage.setItem(STORAGE_KEY.VISIT_PATH_NAME, pathname);
    }
    // VISIT_PATH_NAME, IS_REJECTED 둘다 있다면 삭제
    if (VISIT_PATH_NAME && IS_REJECTED) {
      removeStorageDatas();
    }
  }, [IS_REJECTED]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6, //2.3
    slidesToScroll: 1,
    arrows: false
  };

  // TODO 반복되는 코드 리팩토링 작업 필요
  return (
    <S.DogInfoContainer>
      <S.TitleBox>
        <S.Title>내 강아지 정보</S.Title>
        <S.DeleteDogButton onClick={toggle}>강아지 삭제</S.DeleteDogButton>
      </S.TitleBox>

      {data.doglist.length <= 1 ? (
        <S.MyDogInfoList>
          {data.doglist.map((item) => (
            <>
              {item.dogId && (
                <MyDogCard
                  key={item.dogName}
                  dogId={item.dogId}
                  isOpen={isOpen}
                  dogName={item.dogName}
                  schoolInfo={item.schoolName}
                  registeredDate={item.registeredDate.map((item) => String(item))}
                  profileUri={
                    //FIXME dogProfile url 연결 필요
                    item.dogProfile
                      ? item.dogProfile
                      : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  status={item.status}
                  dogLength={data.doglist.length}
                />
              )}
              {item.status === "APPROVAL_PENDING" && (
                <WaitingCard dogName={item.dogName} registeredDate={item.registeredDate} />
              )}

              {IS_REJECTED &&
                JSON.parse(IS_REJECTED) &&
                rejectedDogs &&
                rejectedDogs.map((el: { dogName: string; registeredDate: number[] }) => (
                  <RejectedCard dogName={el.dogName} registeredDate={el.registeredDate} />
                ))}
            </>
          ))}
          <AddMyDogCard />
        </S.MyDogInfoList>
      ) : (
        <S.CarouselSlider {...settings}>
          {data.doglist.map((item) => (
            <>
              {item.dogId && (
                <MyDogCard
                  key={item.dogName}
                  dogId={item.dogId}
                  isOpen={isOpen}
                  dogName={item.dogName}
                  schoolInfo={item.schoolName}
                  registeredDate={item.registeredDate.map((item) => String(item))}
                  profileUri={
                    //FIXME dogProfile url 연결 필요
                    item.dogProfile
                      ? item.dogProfile
                      : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  status={item.status}
                  dogLength={data.doglist.length}
                />
              )}
              {item.status === "APPROVAL_PENDING" && (
                <WaitingCard dogName={item.dogName} registeredDate={item.registeredDate} />
              )}
            </>
          ))}

          {/* {IS_REJECTED &&
              JSON.parse(IS_REJECTED) &&
              rejectedDogs &&
              rejectedDogs.map((el: { dogName: string; registeredDate: number[] }) => (
                <RejectedCard dogName={el.dogName} registeredDate={el.registeredDate} />
              ))} */}
          {approvalDeniedDog.length > 0 &&
            approvalDeniedDog.map((dog, idx) => (
              <RejectedCard key={idx} dogName={dog.dogName} registeredDate={[2024, 0, 1]} />
            ))}
          <AddMyDogCard />
        </S.CarouselSlider>
      )}
    </S.DogInfoContainer>
  );
};

export default MyDogInfo;
