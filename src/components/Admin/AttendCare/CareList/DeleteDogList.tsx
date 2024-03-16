import { useContext } from "react";
import { ICareDogInfo } from "types/admin.caredog.type";

import { MainDogGrid } from "./styles";
import DeleteDogCard from "../CareCard/DeleteDogCard";
import { SelectedIdsContext } from "../provider/SelectedIdsProvider";

interface DeleteDogListProps {
  data: ICareDogInfo[];
}

const DeleteDogList = ({ data }: DeleteDogListProps) => {
  const selectIdsContext = useContext(SelectedIdsContext);

  const handleSubmit = () => {
    console.log(Array.from(selectIdsContext?.selectedIds ?? []));
  };

  return (
    <MainDogGrid>
      {data.map((item) => (
        <DeleteDogCard
          key={item.attendanceId}
          dogId={item.dogId}
          dogName={item.dogName}
          attendanceId={item.attendanceId}
          isChecked={selectIdsContext?.selectedIds.has(item.attendanceId)}
          toggleId={selectIdsContext?.toggleId}
        />
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </MainDogGrid>
  );
};

export default DeleteDogList;
