import { useState } from "react";
import { useDogListAndSortedList } from "hooks/api/useSortDogsQuery";
import DogSearchList from "./DogSearchList";
import SortSelectBox from "./SortSelectBox";
import { LIST } from "constants/option";
import { Blur } from "./styles";

interface DogListProps {
  schoolId: number;
  adminId: number;
  isFocus: boolean;
}

const DogList = ({ schoolId, adminId, isFocus }: DogListProps) => {
  const [sortName, setSortName] = useState<string>(LIST.REGISTERED);
  const { data } = useDogListAndSortedList({ sortName, schoolId, adminId });

  return (
    <Blur $isFocus={isFocus}>
      <SortSelectBox sortName={sortName} setSortName={setSortName} />
      <DogSearchList data={data} />
    </Blur>
  );
};

export default DogList;
