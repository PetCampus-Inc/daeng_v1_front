import { LIST } from "constants/option";

import { useDogListAndSortedList, useDogSearchQuery } from "hooks/api/attendanceQuery";
import { type SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

import AttendanceSearchInput from "./AttendanceSearchInput";
import SearchList from "./SearchList";
import SortSelectBox from "./SortSelectBox";
import { Blur, Spacing } from "./styles";

interface AttendanceMainProps {
  isFocus: boolean;
  setIsFocus: React.Dispatch<SetStateAction<boolean>>;
}

const AttendanceMain = ({ isFocus, setIsFocus }: AttendanceMainProps) => {
  const { schoolId, adminId } = useRecoilValue(adminLoginInfoAtom);
  const [sortName, setSortName] = useState<string>(LIST.REGISTERED);
  const { data: dogList } = useDogListAndSortedList({ sortName, schoolId, adminId });
  const [searchText, setSearchText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: searchList, isLoading } = useDogSearchQuery(schoolId, searchQuery);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleClear = () => {
    setSearchText("");
    setSearchQuery("");
  };

  // TODO: loading과 error 컴포넌트는 SearchList에 내려줘서 표시하도록 변경 or 따로 하위 Fetcher 컴포넌트 만들 것
  if (isLoading) return <div>로딩중...</div>;

  const dataToShow = searchQuery ? searchList : dogList;
  const type = searchQuery ? "search" : "list";

  return (
    <>
      <AttendanceSearchInput
        name="dogSearch"
        placeholder="검색"
        onChange={(e) => setSearchText(e.target.value)}
        onSearch={handleSearch}
        onClear={handleClear}
        value={searchText}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      <Blur $isFocus={isFocus}>
        {!searchQuery ? (
          <SortSelectBox sortName={sortName} setSortName={setSortName} />
        ) : (
          <Spacing />
        )}
        <SearchList data={dataToShow} type={type} />
      </Blur>
    </>
  );
};

export default AttendanceMain;
