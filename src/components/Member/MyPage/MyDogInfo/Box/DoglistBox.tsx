import { DOG_STATUS, STORAGE_KEY } from "constants/memberDogStatus";

import { useCallback, useEffect, useRef, useState } from "react";
import { IDoglist } from "types/member/main.types";

import AddMyDogCard from "../../Cards/AddMyDogCard";
import MyDogCard from "../../Cards/MyDogCard";
import RejectedCard from "../../Cards/RejectedCard";
import WaitingCard from "../../Cards/WaitingCard";
import useDogRejected from "../../hooks/useDogRejected";

interface DoglistBoxProps {
  doglist: IDoglist[];
  isOpen: boolean;
}

const DoglistBox = ({ doglist, isOpen }: DoglistBoxProps) => {
  const approvalDeniedDogSettingCalled = useRef(false); // 함수 호출 추적
  const [activeDogId, setActiveDogId] = useState("");
  const [upDateDoglist, setUpDateDoglist] = useState([...doglist]);
  const dogDeniedStatus = doglist.filter((el) => el.status === DOG_STATUS.APPROVAL_DENIED);

  const {
    VISIT_MYPAGE,
    saveStorageData,
    resetStoredVisitPathIdValue,
    removeApprovalDeniedDog,
    initialVisit,
    isDeleteSuccessful,
    setInitialVisit
  } = useDogRejected();

  const handleCardFocus = (dogId: string) => {
    setActiveDogId(dogId);
    setUpDateDoglist((prevDoglist) => {
      const currentDog = prevDoglist.find((dog) => dog.dogId === dogId);
      const remainDogs = prevDoglist.filter((dog) => dog.dogId !== dogId);
      return currentDog ? [currentDog, ...remainDogs] : prevDoglist;
    });
  };

  const approvalDeniedDogSetting = useCallback(async () => {
    // 이미 데이터가 삭제된 경우 함수 호출 방지
    if (approvalDeniedDogSettingCalled.current || dogDeniedStatus.length <= 0 || isDeleteSuccessful)
      return;

    if (dogDeniedStatus.length > 0 && !VISIT_MYPAGE) {
      // 첫 방문시 mypage path localStorage에 저장
      saveStorageData(STORAGE_KEY.VISIT_MYPAGE, true);
      setInitialVisit(true);
    } else {
      approvalDeniedDogSettingCalled.current = true;
      await removeApprovalDeniedDog();
    }
  }, [
    VISIT_MYPAGE,
    dogDeniedStatus.length,
    isDeleteSuccessful,
    removeApprovalDeniedDog,
    saveStorageData,
    setInitialVisit
  ]);

  useEffect(() => {
    if (dogDeniedStatus.length <= 0) {
      resetStoredVisitPathIdValue();
    }

    if (dogDeniedStatus.length > 0 && !initialVisit) {
      approvalDeniedDogSetting();
    }
  }, [dogDeniedStatus, initialVisit]);

  return (
    <>
      {upDateDoglist.map((dog) => {
        if (dog.dogId && dog.status !== DOG_STATUS.APPROVAL_PENDING) {
          return (
            <MyDogCard
              key={dog.dogName}
              dogData={dog}
              schoolInfo={dog.schoolName}
              profileUri={dog.dogProfile && dog.dogProfile}
              dogLength={doglist.length}
              isOpen={isOpen}
              isActive={dog.dogId === activeDogId}
              onCardFocus={handleCardFocus}
            />
          );
        }

        if (dog.status === DOG_STATUS.APPROVAL_PENDING) {
          return (
            <WaitingCard
              key={dog.dogName}
              dogName={dog.dogName}
              registeredDate={dog.registeredDate}
            />
          );
        }

        if (dog.status === DOG_STATUS.APPROVAL_DENIED) {
          return (
            <RejectedCard
              key={dog.dogName}
              dogName={dog.dogName}
              registeredDate={dog.registeredDate.map(Number)}
            />
          );
        }
      })}
      <AddMyDogCard />
    </>
  );
};

export default DoglistBox;
