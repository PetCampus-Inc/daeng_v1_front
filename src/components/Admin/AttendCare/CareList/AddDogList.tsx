import { useGetNewCareDogs } from "hooks/api/admin/care";
import { useEffect } from "react";
import { ICareDogInfo } from "types/admin/care.types";

import { ListContainer, ListTitle, ListWrapper } from "./styles";
import AddDogCard from "../CareCard/AddDogCard";
import { useSelectedDogs } from "../hooks/useSelectedDogs";

type AddDogList = {
  adminId?: number;
};

const AddDogList = ({ adminId }: AddDogList) => {
  if (!adminId) throw new Error("adminId가 없습니다!");

  const { data, isFetchedAfterMount } = useGetNewCareDogs(adminId);
  const [selectedDogs, dispatch] = useSelectedDogs();

  const addDog = (dog: ICareDogInfo) => {
    dispatch({ type: "ADD_DOG", payload: dog });
  };

  useEffect(() => {
    if (data && isFetchedAfterMount) {
      const updatedSelectedDogs = selectedDogs.filter((selectedDog) =>
        data.some(
          (serverDog) => serverDog.dogId === selectedDog.dogId && serverDog.adminName === null
        )
      );

      dispatch({ type: "SET_DOGS", payload: updatedSelectedDogs });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetchedAfterMount]);

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
            isChecked={selectedDogs.some((dog) => dog.dogId === item.dogId)}
            onClick={() => addDog(item)}
          />
        ))}
      </ListWrapper>
    </ListContainer>
  );
};

export default AddDogList;
