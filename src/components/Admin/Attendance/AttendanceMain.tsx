import useDogSearchQuery from "hooks/api/useDogSearchQuery";
import { type SetStateAction, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

import AttendanceSearchInput from "./AttendanceSearchInput";
import List from "./List";
import SearchList from "./SearchList";
import { Spacing } from "./styles";

interface AttendanceMainProps {
  isFocus: boolean;
  setIsFocus: React.Dispatch<SetStateAction<boolean>>;
}

const AttendanceMain = ({ isFocus, setIsFocus }: AttendanceMainProps) => {
  const { schoolId, adminId } = useRecoilValue(adminLoginInfoAtom).data;
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("dogName") || "");
  const { data, isLoading, isFetching } = useDogSearchQuery(schoolId, searchText);

  const handleSearch = (value: React.SetStateAction<string>) => {
    setSearchText(value);
  };

  // FIXME: searchText가 없는데도 사이드이펙트 실행되고 있음.
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
