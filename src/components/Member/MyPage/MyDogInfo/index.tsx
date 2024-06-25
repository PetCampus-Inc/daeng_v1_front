import { DOG_STATUS } from "constants/memebrDogStatus";

import { DragCarousel } from "components/common/Carousel/DragCarousel ";
import useMemberRejected from "hooks/api/member/useMemberRejected";
import { useToggle } from "hooks/common/useToggle";
import { useCallback, useEffect, useRef } from "react";
import { IDogRejected, IDoglist, IMemberInfo } from "types/member/main.types";

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
  const { doglist } = data;

  // TODO 반복되는 코드 리팩토링 작업 필요
  const renderMyDogCard = (dog: IDoglist) => (
    <MyDogCard
      key={dog.dogId}
      dogId={dog.dogId}
      isOpen={isOpen}
      dogName={dog.dogName}
      schoolInfo={dog.schoolName}
      registeredDate={dog.registeredDate.map(String)}
      profileUri={dog.dogProfile && dog.dogProfile}
      status={dog.status}
      dogLength={doglist.length}
    />
  );

  const renderWaitingCard = (dog: IDoglist) => (
    <WaitingCard key={dog.dogId} dogName={dog.dogName} registeredDate={dog.registeredDate} />
  );

  const renderRejectedCard = (dog: IDogRejected) => (
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

      {doglist.length <= 1 ? (
        <S.MyDogInfoList>
          {doglist.map((dog) => dog.dogId && renderMyDogCard(dog))}
          <AddMyDogCard />
        </S.MyDogInfoList>
      ) : (
        <S.DragCarouselWrapper>
          <DragCarousel gap={12}>
            {doglist.map((dog) => dog.dogId && renderMyDogCard(dog))}
            {doglist.map(
              (dog) => dog.status === DOG_STATUS.APPROVAL_PENDING && renderWaitingCard(dog)
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
