import { useContext } from "react";
import { ICareDogInfo } from "types/admin/care.types";

import { MainDogGrid } from "./styles";
import SelectDogCard from "../card/SelectDogCard";
import { SelectedIdsContext } from "../context/SelectedIdsProvider";

interface Props {
  type: "delete" | "select";
  data: ICareDogInfo[];
}

const SelectDogList = ({ data, type }: Props) => {
  const selectIdsContext = useContext(SelectedIdsContext);
  const selectId = type === "select" ? "dogId" : "attendanceId";

  return (
    <MainDogGrid>
      {data.map((item) => (
        <SelectDogCard
          key={item.attendanceId}
          dogId={item.dogId}
          dogName={item.dogName}
          selectId={item[selectId]}
          isChecked={selectIdsContext?.selectedIds.has(item[selectId])}
          toggleId={selectIdsContext?.toggleId}
        />
      ))}
    </MainDogGrid>
  );
};

export default SelectDogList;
