import { useDogListAndSortedList, useDogSearchQuery } from "hooks/api/attendanceQuery";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { type SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";
import { sortOptionAtom } from "store/overlay";

import SortSelectBox from "./AttendanceButton/SortSelectBox";
import AttendanceSearchInput from "./AttendanceInput/AttendanceSearchInput";
import SearchList from "./AttendanceList/SearchList";
import { Blur, Spacing } from "./styles";

interface AttendanceMainProps {
  isFocus: boolean;
  setIsFocus: React.Dispatch<SetStateAction<boolean>>;
}

const AttendanceMain = ({ isFocus, setIsFocus }: AttendanceMainProps) => {
  const { schoolId, adminId } = useAdminInfo();
  const sortName = useRecoilValue(sortOptionAtom);
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
        {!searchQuery ? <SortSelectBox sortName={sortName} /> : <Spacing />}
        <SearchList data={dataToShow} type={type} />
      </Blur>
    </>
  );
};

export default AttendanceMain;
