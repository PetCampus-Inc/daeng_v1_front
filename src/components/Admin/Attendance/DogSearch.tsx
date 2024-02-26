import { useState } from "react";
import { useDogListAndSortedList } from "hooks/api/useSortDogsQuery";
import AttendanceSearchInput from "./AttendanceSearchInput";
import DogSearchList from "./DogSearchList";
import SortSelectBox from "./SortSelectBox";
import { LIST } from "constants/option";

type DogSearchProps = { schoolId: number; adminId: number };

const DogSearch = ({ schoolId, adminId }: DogSearchProps) => {
  const [sortName, setSortName] = useState<string>(LIST.REGISTERED);
  const { data, isLoading } = useDogListAndSortedList({ sortName, schoolId, adminId });

  // const handleSearch = (value) => {
  //   setSearchQuery(value);
  //   setTriggerSearch(true);
  // };
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <AttendanceSearchInput name="dogSearch" placeholder="검색" />
      <SortSelectBox sortName={sortName} setSortName={setSortName} />
      <DogSearchList data={data} />
    </>
  );
};

export default DogSearch;
