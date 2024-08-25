import { DOG_STATUS, STORAGE_KEY } from "constants/memebrDogStatus";

import { DragCarousel } from "components/common/Carousel/DragCarousel ";
import useDogRejected from "components/Member/MyPage/hooks/useDogRejected";
import { useToggle } from "hooks/common/useToggle";
import { useCallback, useEffect } from "react";
import { IEnrollmentStatus } from "types/member/enrollment.types";
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
  const { isOpen, toggle } = useToggle();
  const { doglist } = data;
  const {
    VISIT_MYPAGE,
    saveStorageData,
    approvalDeniedDogs,
    resetStoradVisitPathIdValue,
    removeApprovalDeniedDog,
    initialVisit,
    setInitialVisit
  } = useDogRejected();

  const renderMyDogCard = (dog: IDoglist) => (
    <MyDogCard
      key={dog.dogName}
      dogId={dog.dogId}
      isOpen={isOpen}
      dogName={dog.dogName}
      schoolInfo={dog.schoolName}
      registeredDate={dog.registeredDate && dog.registeredDate.map(String)}
      profileUri={dog.dogProfile && dog.dogProfile}
      status={dog.status}
      dogLength={doglist.length}
    />
  );

  const renderWaitingCard = (dog: IDoglist) => (
    <WaitingCard key={dog.dogName} dogName={dog.dogName} registeredDate={dog.registeredDate} />
  );

  const renderRejectedCard = (dog: IEnrollmentStatus) => (
    <RejectedCard
      key={dog.enrollmentFormId}
      dogName={dog.dogName}
      registeredDate={dog.registeredDate.map(Number)}
    />
  );

  const approvalDeniedDogSetting = useCallback(async () => {
    // 이미 데이터가 삭제된 경우 함수 호출 방지
    if (approvalDeniedDogs.length <= 0) return;

    if (approvalDeniedDogs.length > 0 && !VISIT_MYPAGE) {
      saveStorageData(STORAGE_KEY.VISIT_MYPAGE, true);
      setInitialVisit(true);
      return;
    }
    return await removeApprovalDeniedDog();
  }, [VISIT_MYPAGE, approvalDeniedDogs, removeApprovalDeniedDog, saveStorageData]);

  useEffect(() => {
    // FIXME 가입신청 후 false인데도 VISIT_MYPAGE에 데이터가 저장되는 이슈 확인하기!!
    if (approvalDeniedDogs.length <= 0) {
      resetStoradVisitPathIdValue();
      return;
    }
    if (approvalDeniedDogs.length > 0 && !initialVisit) {
      // 첫 방문시 mypage path localStorage에 저장
      approvalDeniedDogSetting();
    }
  }, [approvalDeniedDogs, approvalDeniedDogSetting, initialVisit]);

  return (
    <S.DogInfoContainer>
      <S.TitleBox>
        <S.Title>내 강아지 정보</S.Title>
        <S.DeleteDogButton onClick={toggle}>강아지 삭제</S.DeleteDogButton>
      </S.TitleBox>

      {doglist.length <= 1 ? (
        <S.MyDogInfoList>
          {doglist.map(
            (dog) => dog.dogId && dog.status !== DOG_STATUS.APPROVAL_PENDING && renderMyDogCard(dog)
          )}
          <AddMyDogCard />
        </S.MyDogInfoList>
      ) : (
        <S.DragCarouselWrapper>
          <DragCarousel gap={12}>
            {doglist.map(
              (dog) =>
                dog.dogId && dog.status !== DOG_STATUS.APPROVAL_PENDING && renderMyDogCard(dog)
            )}
            {doglist.map(
              (dog) => dog.status === DOG_STATUS.APPROVAL_PENDING && renderWaitingCard(dog)
            )}
            {approvalDeniedDogs.map(
              (dog) => dog.status === DOG_STATUS.APPROVAL_DENIED && renderRejectedCard(dog)
            )}
            <AddMyDogCard />
          </DragCarousel>
        </S.DragCarouselWrapper>
      )}
    </S.DogInfoContainer>
  );
};

export default MyDogInfo;
