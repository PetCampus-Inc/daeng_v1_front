import { useDogListAndSortedList, useDogSearchQuery } from "hooks/api/admin/attendance";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useState, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { sortOptionState } from "store/form";

import SortSelectBox from "./AttendanceButton/SortSelectBox";
import AttendanceSearchInput from "./AttendanceInput/AttendanceSearchInput";
import SearchList from "./AttendanceList/SearchList";
import { useInputFocus } from "./context/AttendanceProvider";
import { Blur, Spacing } from "./styles";

const AttendanceMain = () => {
  const { schoolId, adminId } = useAdminInfo();
  const sortName = useRecoilValue(sortOptionState);

  const { data: dogList } = useDogListAndSortedList({ sortName, schoolId, adminId });

  const [searchText, setSearchText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: searchList, isLoading } = useDogSearchQuery(schoolId, searchQuery);

  const { isFocused, setIsFocused } = useInputFocus();

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleClear = useCallback(() => {
    setSearchText("");
    setSearchQuery("");
  }, []);

  // TODO: loading과 error 컴포넌트는 SearchList에 내려줘서 표시하도록 변경 or 따로 하위 Fetcher 컴포넌트 만들 것
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Blur isFocus={isFocused}>
        {!searchQuery ? <SortSelectBox sortName={sortName} /> : <Spacing />}
        {isLoading ? <div>로딩중...</div> : <SearchList data={dataToShow} type={type} />}
      </Blur>
    </>
  );
};

export default AttendanceMain;
