import Text from "components/common/Text";
import { useRecoilValue } from "recoil";
import { dogListInfoAtom } from "store/admin";
import DogCard from "../DogCard";
import { ThemeConfig } from "styles/ThemeConfig";
import { StyledTextWrapper } from "../styles";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setIsCallModalOpen: Dispatch<SetStateAction<boolean>>;
  setTargetDogId: Dispatch<SetStateAction<number>>;
}

const Mode = ({ setIsCallModalOpen, setTargetDogId }: Props) => {
  const dogLists = useRecoilValue(dogListInfoAtom).data;
  const [selectedDogIds, setSeletedDogIds] = useState<number[]>([]);

  return (
    <>
      {dogLists.length > 0 ? (
        dogLists.map((data) => {
          return (
            <DogCard
              key={data.dogId}
              name={data.dogName}
              allRounds={data.allRounds}
              currentRounds={data.currentRounds}
              monthlyTicket={data.monthlyTicket}
              dogId={data.dogId}
              setIsCallModalOpen={setIsCallModalOpen}
              setTargetDogId={setTargetDogId}
              className="MODE"
              setSeletedDogIds={setSeletedDogIds}
              selectedDogIds={selectedDogIds}
            />
          );
        })
      ) : (
        <StyledTextWrapper>
          <Text text="아직 등원한 강아지가 없어요" color={ThemeConfig.gray_3} />
        </StyledTextWrapper>
      )}
    </>
  );
};

export default Mode;
