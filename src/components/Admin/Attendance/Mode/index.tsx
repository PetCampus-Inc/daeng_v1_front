import Text from "components/common/Text";
import { useRecoilValue } from "recoil";
import { adminInfoAtom } from "store/admin";
import DogCard from "../DogCard";
import { ThemeConfig } from "styles/ThemeConfig";

const Mode = () => {
  const dogLists = useRecoilValue(adminInfoAtom).data.dogs;

  return (
    <>
      {dogLists.length > 0 ? (
        dogLists.map((data) => {
          return (
            <DogCard key={data.dogId} name={data.dogName} className="mode" />
          );
        })
      ) : (
        <Text
          text="아직 등원한 강아지가 없어요"
          color={ThemeConfig.gray_3}
          margintop="30%"
        />
      )}
    </>
  );
};

export default Mode;
