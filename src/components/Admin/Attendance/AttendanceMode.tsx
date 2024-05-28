import { useAttendDogSearchQuery, useGetAttendDogList } from "hooks/api/attendanceQuery";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { type SetStateAction, useState } from "react";

import AttendDogSubmitButton from "./AttendanceButton/AttendDogSubmitButton";
import AttendanceSearchInput from "./AttendanceInput/AttendanceSearchInput";
import AttendanceAvatar from "./AttendanceList/AttendanceAvatar";
import AttendanceSearchList from "./AttendanceList/AttendanceSearchList";
import { SelectedDogsProvider } from "./context/SelectedDogProvider";
import { Blur } from "./styles";

interface AttendanceProps {
  isFocus: boolean;
  setIsFocus: React.Dispatch<SetStateAction<boolean>>;
  setMode: React.Dispatch<React.SetStateAction<"DEFAULT" | "ATTENDANCE">>;
}

const AttendanceMode = ({ isFocus, setIsFocus, setMode }: AttendanceProps) => {
  const { schoolId } = useAdminInfo();
  const { data: dogList } = useGetAttendDogList(schoolId);
  const [searchText, setSearchText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: searchList, isLoading } = useAttendDogSearchQuery(schoolId, searchQuery);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleClear = () => {
    setSearchText("");
    setSearchQuery("");
  };

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
        <SelectedDogsProvider>
          <AttendanceAvatar />
          <AttendanceSearchList data={dataToShow} type={type} />
          <AttendDogSubmitButton schoolId={schoolId} setMode={setMode} />
        </SelectedDogsProvider>
      </Blur>
    </>
  );
};

export default AttendanceMode;
