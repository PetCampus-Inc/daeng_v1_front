import { useRecoilState } from "recoil";
import { attendCareDogListAtom } from "store/admin";

import { ListContainer, ListTitle, ListWrapper } from "./styles";
import AddDogCard from "../CareCard/AddDogCard";

interface AddDogListProps {
  data: any[];
}

const AddDogList = ({ data }: AddDogListProps) => {
  const [dogList, setDogList] = useRecoilState(attendCareDogListAtom);

  const handleCardClick = (dog: any) => {
    setDogList((prev) => {
      const isSelected = prev.some((selectedDog) => selectedDog.dogId === dog.dogId);
      if (isSelected) {
        return prev.filter((selectedDog) => selectedDog.dogId !== dog.dogId);
      } else {
        return [...prev, dog];
      }
    });
  };

  return (
    <ListContainer>
      <ListTitle>출석한 강아지</ListTitle>
      <ListWrapper>
        {data.map((item) => (
          <AddDogCard
            key={item.dogId}
            dogId={item.dogId}
            dogName={item.dogName}
            adminName={item.adminName}
            isChecked={dogList.some((dog) => dog.dogId === item.dogId)}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </ListWrapper>
    </ListContainer>
  );
};

export default AddDogList;
