import { useAttendDogSearchQuery, useGetAttendDogList } from "hooks/api/admin/attendance";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useState } from "react";

import AttendDogSubmitButton from "./AttendanceButton/AttendDogSubmitButton";
import AttendanceSearchInput from "./AttendanceInput/AttendanceSearchInput";
import AttendanceAvatar from "./AttendanceList/AttendanceAvatar";
import AttendanceSearchList from "./AttendanceList/AttendanceSearchList";
import { useInputFocus } from "./context/AttendanceProvider";
import { SelectedDogsProvider } from "./context/SelectedDogProvider";
import { Blur } from "./styles";

const AttendanceManagement = () => {
  const { adminId, schoolId } = useAdminInfo();

  const { data: dogList } = useGetAttendDogList(schoolId);

  const [searchText, setSearchText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: searchList, isLoading } = useAttendDogSearchQuery(schoolId, searchQuery);

  const { isFocused, setIsFocused } = useInputFocus();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleClear = () => {
    setSearchText("");
    setSearchQuery("");
  };

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
        {isLoading ? (
          <div>로딩중...</div>
        ) : (
          <SelectedDogsProvider>
            <AttendanceAvatar />
            <AttendanceSearchList data={dataToShow} type={type} />
            <AttendDogSubmitButton schoolId={schoolId} adminId={adminId} />
          </SelectedDogsProvider>
        )}
      </Blur>
    </>
  );
};

export default AttendanceManagement;
