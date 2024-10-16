import { useContext } from "react";
import { CareDogInfo } from "types/admin/care.types";

import { MainDogGrid } from "./styles";
import SelectDogCard from "../card/SelectDogCard";
import { SelectedIdsContext } from "../context/SelectedIdsProvider";

interface Props {
  type: "delete" | "select";
  data: CareDogInfo[];
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
          profileUri={item.profileUri}
          selectId={item[selectId]}
          isChecked={selectIdsContext?.selectedIds.has(item[selectId])}
          toggleId={selectIdsContext?.toggleId}
        />
      ))}
    </MainDogGrid>
  );
};

export default SelectDogList;
