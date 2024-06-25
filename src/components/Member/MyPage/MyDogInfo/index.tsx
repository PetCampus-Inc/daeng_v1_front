import { DOG_STATUS } from "constants/memebrDogStatus";

import { DragCarousel } from "components/common/Carousel/DragCarousel ";
import useMemberRejected from "hooks/api/member/useMemberRejected";
import { useToggle } from "hooks/common/useToggle";
import { useCallback, useEffect, useRef } from "react";
import { IDoglist, IMemberInfo } from "types/member/main.types";

import * as S from "./styles";
import AddMyDogCard from "../Cards/AddMyDogCard";
import MyDogCard from "../Cards/MyDogCard";
import RejectedCard from "../Cards/RejectedCard";
import WaitingCard from "../Cards/WaitingCard";

interface MemberInfoProps {
  data: IMemberInfo;
}

const MyDogInfo = ({ data }: MemberInfoProps) => {
  const approvalDeniedDogRef = useRef(true);
  const { isOpen, toggle } = useToggle();

  const { VISIT_MYPAGE, saveStorageData, approvalDeniedDogs, removeApprovalDeniedDog } =
    useMemberRejected();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6, //2.3
    slidesToScroll: 1,
    arrows: false
  };

  // TODO 반복되는 코드 리팩토링 작업 필요
  const renderMyDogCard = (item: IDoglist) => (
    <MyDogCard
      key={item.dogId}
      dogId={item.dogId}
      isOpen={isOpen}
      dogName={item.dogName}
      schoolInfo={item.schoolName}
      registeredDate={item.registeredDate.map(String)}
      profileUri={item.dogProfile && item.dogProfile}
      status={item.status}
      dogLength={data.doglist.length}
    />
  );

  const renderWaitingCard = (item: IDoglist) => (
    <WaitingCard key={item.dogId} dogName={item.dogName} registeredDate={item.registeredDate} />
  );

  const renderRejectedCard = (dog: { enrollmentFormId?: number; dogName: string }) => (
    <RejectedCard key={dog.enrollmentFormId} dogName={dog.dogName} registeredDate={[2024, 0, 1]} />
  );

  const approvalDeniedDogSetting = useCallback(async () => {
    // 이미 데이터가 삭제된 경우 함수 호출 방지
    if (!approvalDeniedDogs.length) return;

    if (!VISIT_MYPAGE) {
      saveStorageData();
      approvalDeniedDogRef.current = false;
    } else {
      await removeApprovalDeniedDog();
    }
  }, [VISIT_MYPAGE, saveStorageData, removeApprovalDeniedDog]);

  useEffect(() => {
    if (approvalDeniedDogRef.current && approvalDeniedDogs.length > 0) {
      // 첫 방문시 mypage path localStorage에 저장
      approvalDeniedDogSetting();
      approvalDeniedDogRef.current = false; // 함수 실행 후 초기화
    }
  }, [approvalDeniedDogs, approvalDeniedDogSetting]);

  return (
    <S.DogInfoContainer>
      <S.TitleBox>
        <S.Title>내 강아지 정보</S.Title>
        <S.DeleteDogButton onClick={toggle}>강아지 삭제</S.DeleteDogButton>
      </S.TitleBox>

      {data.doglist.length <= 1 ? (
        <S.MyDogInfoList>
          {data.doglist.map((item) => item.dogId && renderMyDogCard(item))}
          {data.doglist.map(
            (item) => item.status === DOG_STATUS.APPROVAL_PENDING && renderWaitingCard(item)
          )}
          {approvalDeniedDogs.map((dog) => renderRejectedCard(dog))}
          <AddMyDogCard />
        </S.MyDogInfoList>
      ) : (
        <S.DragCarouselWrapper>
          <DragCarousel gap={10}>
            {data.doglist.map((item) => item.dogId && renderMyDogCard(item))}
            {data.doglist.map(
              (item) => item.status === DOG_STATUS.APPROVAL_PENDING && renderWaitingCard(item)
            )}
            {approvalDeniedDogs.map((dog) => renderRejectedCard(dog))}
            <AddMyDogCard />
          </DragCarousel>
        </S.DragCarouselWrapper>
      )}
    </S.DogInfoContainer>
  );
};

export default MyDogInfo;
