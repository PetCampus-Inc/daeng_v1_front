import BackgroundButton from "components/common/Button/BackgroundButton";
import {
  useAttendDogSearchQuery,
  useCreateAttendDog,
  useGetAttendDogList
} from "hooks/api/attendanceQuery";
import { type SetStateAction, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { adminLoginInfoAtom, attendDogListInfoAtom } from "store/admin";

import AttendanceAvatar from "./AttendanceAvatar";
import AttendanceSearchInput from "./AttendanceSearchInput";
import AttendanceSearchList from "./AttendanceSearchList";
import { BackgroundButtonWrapper, Blur, Spacing } from "./styles";

interface AttendanceProps {
  isFocus: boolean;
  setIsFocus: React.Dispatch<SetStateAction<boolean>>;
  setMode: React.Dispatch<React.SetStateAction<"DEFAULT" | "ATTENDANCE">>;
}

const Attendance = ({ isFocus, setIsFocus, setMode }: AttendanceProps) => {
  const { schoolId } = useRecoilValue(adminLoginInfoAtom);
  const { data: dogList } = useGetAttendDogList(schoolId);
  const [searchText, setSearchText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: searchList, isLoading } = useAttendDogSearchQuery(schoolId, searchQuery);
  const [selectedList, setSelectedList] = useRecoilState(attendDogListInfoAtom);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleClear = () => {
    setSearchText("");
    setSearchQuery("");
  };

  const { mutateAttend } = useCreateAttendDog();

  const handleItemRemove = (dogId: number) => {
    setSelectedList((prev) => prev.filter((dog) => dog.dogId !== dogId));
  };

  const handlePostAttend = () => {
    mutateAttend(
      {
        schoolId,
        selectedDogIds: selectedList.map((item) => item.attendanceId)
      },
      {
        onSuccess: () => setMode("DEFAULT")
      }
    );
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
        {selectedList.length > 0 ? (
          <AttendanceAvatar selectedDogs={selectedList} onRemoveDog={handleItemRemove} />
        ) : (
          <Spacing />
        )}
        <AttendanceSearchList data={dataToShow} type={type} />
        <BackgroundButtonWrapper>
          <BackgroundButton onClick={handlePostAttend} disabled={selectedList.length === 0}>
            출석 완료
          </BackgroundButton>
        </BackgroundButtonWrapper>
      </Blur>
    </>
  );
};

export default Attendance;
