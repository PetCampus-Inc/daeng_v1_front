import useDogSearchQuery from "hooks/api/useDogSearchQuery";
import { type SetStateAction, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import AttendanceSearchInput from "./AttendanceSearchInput";
import List from "./List";
import SearchList from "./SearchList";
import { Spacing } from "./styles";

interface AttendanceMainProps {
  schoolId: number;
  adminId: number;
  isFocus: boolean;
  setIsFocus: React.Dispatch<SetStateAction<boolean>>;
}

const AttendanceMain = ({ schoolId, adminId, isFocus, setIsFocus }: AttendanceMainProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("dogName") || "");
  const { data, isLoading, isFetching } = useDogSearchQuery(schoolId, searchText);

  const handleSearch = (value: React.SetStateAction<string>) => {
    setSearchText(value);
  };

  useEffect(() => {
    const cleanedSearchParams = Object.fromEntries(
      Object.entries({ dogName: searchText }).filter(([, value]) => !!value)
    );
    setSearchParams(new URLSearchParams(cleanedSearchParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const showSearchResults = isLoading || isFetching || data || searchText;

  if (isLoading) return <div>로딩중...</div>;

  return (
    <>
      <AttendanceSearchInput
        name="dogSearch"
        placeholder="검색"
        onSearch={handleSearch}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {showSearchResults ? (
        <>
          <Spacing />
          <SearchList data={data} />
        </>
      ) : (
        <List schoolId={schoolId} adminId={adminId} isFocus={isFocus} />
      )}
    </>
  );
};

export default AttendanceMain;
