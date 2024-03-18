import BackgroundButton from "components/common/Button/BackgroundButton";
import useAttendDog from "hooks/api/useAttendDogMutation";
import useAttendDogSearchQuery from "hooks/api/useAttendDogSearchQuery";
import { type SetStateAction, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { adminLoginInfoAtom, attendDogListInfoAtom } from "store/admin";

import AttendanceAvatar from "./AttendanceAvatar";
import AttendanceList from "./AttendanceList";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("dogName") || "");
  const { data, isLoading, isFetching } = useAttendDogSearchQuery(schoolId, searchText);
  const [dogList, setDogList] = useRecoilState(attendDogListInfoAtom);
  const handleSearch = (value: React.SetStateAction<string>) => {
    setSearchText(value);
  };
  const { mutateAttend } = useAttendDog();

  useEffect(() => {
    const cleanedSearchParams = Object.fromEntries(
      Object.entries({ dogName: searchText }).filter(([, value]) => !!value)
    );
    setSearchParams(new URLSearchParams(cleanedSearchParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const showSearchResults = isLoading || isFetching || data || searchText;

  const handleItemRemove = (dogId: number) => {
    setDogList((prev) => prev.filter((dog) => dog.dogId !== dogId));
  };

  const handlePostAttend = () => {
    mutateAttend(
      {
        schoolId,
        selectedDogIds: dogList.map((item) => item.attendanceId)
      },
      {
        onSuccess: () => setMode("DEFAULT")
      }
    );
  };

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
      <Blur $isFocus={isFocus}>
        {dogList.length > 0 ? (
          <AttendanceAvatar selectedDogs={dogList} onRemoveDog={handleItemRemove} />
        ) : (
          <Spacing />
        )}
        {showSearchResults ? (
          <AttendanceSearchList data={data} />
        ) : (
          <AttendanceList schoolId={schoolId} />
        )}
        <BackgroundButtonWrapper>
          <BackgroundButton onClick={handlePostAttend} disabled={dogList.length > 0}>
            출석 완료
          </BackgroundButton>
        </BackgroundButtonWrapper>
      </Blur>
    </>
  );
};

export default Attendance;
