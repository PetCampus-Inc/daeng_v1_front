import { useContext } from "react";
import { ICareDogInfo } from "types/admin/care.types";

import { MainDogGrid } from "./styles";
import DeleteDogCard from "../card/DeleteDogCard";
import { SelectedIdsContext } from "../context/SelectedIdsProvider";

interface DeleteDogListProps {
  data: ICareDogInfo[];
}

const DeleteDogList = ({ data }: DeleteDogListProps) => {
  const selectIdsContext = useContext(SelectedIdsContext);

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
    </MainDogGrid>
  );
};

export default DeleteDogList;
