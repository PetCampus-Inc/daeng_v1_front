import { useState } from "react";
import { useDogListAndSortedList } from "hooks/api/useSortDogsQuery";
import SearchList from "./SearchList";
import SortSelectBox from "./SortSelectBox";
import { LIST } from "constants/option";
import { Blur } from "./styles";

interface ListProps {
  schoolId: number;
  adminId: number;
  isFocus: boolean;
}

const List = ({ schoolId, adminId, isFocus }: ListProps) => {
  const [sortName, setSortName] = useState<string>(LIST.REGISTERED);
  const { data } = useDogListAndSortedList({ sortName, schoolId, adminId });

  return (
    <Blur $isFocus={isFocus}>
      <SortSelectBox sortName={sortName} setSortName={setSortName} />
      <SearchList data={data} />
    </Blur>
  );
};

export default List;
