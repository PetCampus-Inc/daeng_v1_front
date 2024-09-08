import { Box } from "components/common";
import { useGetNewCareDogs } from "hooks/api/admin/care";
import { useEffect } from "react";
import { ICareDogInfo } from "types/admin/care.types";

import { ListContainer, ListTitle, ListWrapper } from "./styles";
import AddDogCard from "../card/AddDogCard";
import EmptyCard from "../empty/EmptyDog";
import { useSelectedDogs } from "../hooks/useSelectedDogs";

const AddDogList = () => {
  const { data, isFetchedAfterMount } = useGetNewCareDogs();
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

  if (!data)
    // 관리할 강아지가 없는 경우
    return (
      <Box mt={50} mb={50} textAlign="center">
        <EmptyCard />
      </Box>
    );

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
