import { DOG_STATUS, STORAGE_KEY } from "constants/memebrDogStatus";

import { DragCarousel } from "components/common/Carousel/DragCarousel ";
import useDogRejected from "components/Member/MyPage/hooks/useDogRejected";
import { useLocalStorageValue } from "hooks/common/useLocalStorage";
import { useToggle } from "hooks/common/useToggle";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const { doglist } = data;
  const [activeDogId, setActiveDogId] = useState("");
  const [upDateDoglist, setUpDatsDoglist] = useState([...doglist]);
  const { isOpen, toggle } = useToggle();
  const CURRENT_DOG_ID = useLocalStorageValue<string>("CURRENT-DOG-ID");

  const dogDeniedStatus = doglist.filter((el) => el.status === DOG_STATUS.APPROVAL_DENIED);
  const approvalDeniedDogSettingCalled = useRef(false); // 함수 호출 추적

  const {
    VISIT_MYPAGE,
    saveStorageData,
    resetStoradVisitPathIdValue,
    removeApprovalDeniedDog,
    initialVisit,
    isDeleteSuccessful,
    setInitialVisit
  } = useDogRejected();

  const handleCardFocus = (dogId: string) => {
    setActiveDogId(dogId);
  };

  // FIXME 강아지 선택될 경우 해당 강아지가 앞으로 나오도록 작업필요!
  const updateDoglist = () => {
    if (CURRENT_DOG_ID) {
      const currentDog = upDateDoglist.filter((el) => el.dogId === CURRENT_DOG_ID);
      const dogs = upDateDoglist.filter((el) => el.dogId !== CURRENT_DOG_ID);
      setUpDatsDoglist([...currentDog, ...dogs]);
    }
  };

  const approvalDeniedDogSetting = useCallback(async () => {
    // 이미 데이터가 삭제된 경우 함수 호출 방지
    if (approvalDeniedDogSettingCalled.current || dogDeniedStatus.length <= 0 || isDeleteSuccessful)
      return;

    if (dogDeniedStatus.length > 0 && !VISIT_MYPAGE) {
      // 첫 방문시 mypage path localStorage에 저장
      saveStorageData(STORAGE_KEY.VISIT_MYPAGE, true);
      setInitialVisit(true);
      return;
    } else {
      approvalDeniedDogSettingCalled.current = true;
      return await removeApprovalDeniedDog();
    }
  }, [VISIT_MYPAGE, dogDeniedStatus.length, isDeleteSuccessful]);

  const renderMyDogCard = (dog: IDoglist) => (
    <MyDogCard
      key={dog.dogName}
      dogData={dog}
      schoolInfo={dog.schoolName}
      profileUri={dog.dogProfile && dog.dogProfile}
      dogLength={doglist.length}
      isOpen={isOpen}
      isActive={dog.dogId === activeDogId}
      onCardFocus={handleCardFocus}
      onClick={updateDoglist}
    />
  );

  const renderWaitingCard = (dog: IDoglist) => (
    <WaitingCard key={dog.dogName} dogName={dog.dogName} registeredDate={dog.registeredDate} />
  );

  const renderRejectedCard = (dog: IEnrollmentStatus | IDoglist) => (
    <RejectedCard
      key={dog.dogName}
      dogName={dog.dogName}
      registeredDate={dog.registeredDate.map(Number)}
    />
  );

  useEffect(() => {
    if (dogDeniedStatus.length <= 0) {
      resetStoradVisitPathIdValue();
      return;
    }

    if (dogDeniedStatus.length > 0 && !initialVisit) {
      approvalDeniedDogSetting();
    }
  }, [dogDeniedStatus, initialVisit]);

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
            {upDateDoglist.map(
              (dog) =>
                dog.dogId && dog.status !== DOG_STATUS.APPROVAL_PENDING && renderMyDogCard(dog)
            )}
            {doglist.map(
              (dog) => dog.status === DOG_STATUS.APPROVAL_PENDING && renderWaitingCard(dog)
            )}

            {doglist.map(
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
