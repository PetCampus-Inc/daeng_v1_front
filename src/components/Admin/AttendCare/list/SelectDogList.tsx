import { useContext } from "react";
import { ICareDogInfo } from "types/admin/care.types";

import { MainDogGrid } from "./styles";
import SelectDogCard from "../card/SelectDogCard";
import { SelectedIdsContext } from "../context/SelectedIdsProvider";

interface Props {
  data: ICareDogInfo[];
}

const SelectDogList = ({ data }: Props) => {
  const selectIdsContext = useContext(SelectedIdsContext);

  return (
    <MainDogGrid>
      {data.map((item) => (
        <SelectDogCard
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

export default SelectDogList;
