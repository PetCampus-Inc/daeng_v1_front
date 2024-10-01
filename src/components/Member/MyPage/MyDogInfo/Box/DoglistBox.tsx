import { DOG_STATUS } from "constants/memberDogStatus";

import { useEffect, useState } from "react";
import { IDoglist } from "types/member/main.types";

import AddMyDogCard from "../../Cards/AddMyDogCard";
import MyDogCard from "../../Cards/MyDogCard";
import RejectedCard from "../../Cards/RejectedCard";
import WaitingCard from "../../Cards/WaitingCard";

interface DoglistBoxProps {
  doglist: IDoglist[];
  isOpen: boolean;
}

const DoglistBox = ({ doglist, isOpen }: DoglistBoxProps) => {
  const [upDateDoglist, setUpDateDoglist] = useState([...doglist]);

  const handleCardFocus = (dogId: string) => {
    setUpDateDoglist((prevDoglist) => {
      const currentDog = prevDoglist.find((dog) => dog.dogId === dogId);
      const remainDogs = prevDoglist.filter((dog) => dog.dogId !== dogId);
      return currentDog ? [currentDog, ...remainDogs] : prevDoglist;
    });
  };

  // doglist가 변경될 때마다 upDateDoglist 최신 doglist로 업데이트
  // FIXME 더 나은 방법 고려 필요함
  useEffect(() => {
    setUpDateDoglist([...doglist]);
  }, [doglist]);

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
              onCardFocus={handleCardFocus}
            />
          );
        }
      })}

      {doglist.map((dog) => {
        if (dog.status === DOG_STATUS.APPROVAL_PENDING) {
          return (
            <WaitingCard
              key={dog.dogName}
              dogName={dog.dogName}
              registeredDate={dog.registeredDate}
              enrollmentFormId={dog.enrollmentFormId}
            />
          );
        }

        if (dog.status === DOG_STATUS.APPROVAL_DENIED) {
          return (
            <RejectedCard
              key={dog.dogName}
              dogName={dog.dogName}
              registeredDate={dog.registeredDate.map(Number)}
              enrollmentFormId={dog.enrollmentFormId}
            />
          );
        }
      })}

      <AddMyDogCard />
    </>
  );
};

export default DoglistBox;
