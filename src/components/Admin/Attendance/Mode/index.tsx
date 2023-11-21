import Text from "components/common/Text";
import { useRecoilValue } from "recoil";
import { dogListInfoAtom } from "store/admin";
import DogCard from "../DogCard";
import { ThemeConfig } from "styles/ThemeConfig";
import { StyledTextWrapper } from "../styles";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setIsCallModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Mode = ({ setIsCallModalOpen }: Props) => {
  const dogLists = useRecoilValue(dogListInfoAtom).data;

  return (
    <>
      {dogLists.length > 0 ? (
        dogLists.map((data) => {
          return (
            // <DogCard
            //   key={data.dogId}
            //   name={data.dogName}
            //   currentRounds={data.currentRounds}
            //   className="mode"
            //   setIsCallModalOpen={setIsCallModalOpen}
            // />
            <div></div>
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
