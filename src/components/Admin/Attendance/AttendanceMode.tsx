import { useAttendDogSearchQuery, useGetAttendDogList } from "hooks/api/admin/attendance";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useCallback, useState } from "react";
import { useBlocker, useSearchParams } from "react-router-dom";

import AttendDogSubmitButton from "./AttendanceButton/AttendDogSubmitButton";
import AttendanceAvatar from "./AttendanceList/AttendanceAvatar";
import { AttendanceSearchList } from "./AttendanceList/AttendanceSearchList";
import AttendanceCloseModal from "./AttendanceModal/AttendanceCloseModal";
import { EmptyList } from "./EmptyList";
import { useAttendanceModeContext } from "./hooks/useAttendanceModeContext";
import { useSearchContext } from "./hooks/useSearchContext";
import { List } from "./styles";

export function AttendanceMode() {
  const { schoolId, adminId } = useAdminInfo();
  const { data: dogList } = useGetAttendDogList(schoolId);

  const { searchText, isFocused } = useSearchContext();
  const { data: searchList } = useAttendDogSearchQuery(schoolId, searchText);

  const selectedDogs = useAttendanceModeContext();
  const [, setSearchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const data = searchText ? searchList : dogList;

  const handleModeChange = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const blocker = useBlocker(() => selectedDogs.length > 0 && !isSubmitting);

  return (
    <>
      <List isFocus={isFocused}>
        <AttendanceAvatar />
        {!data || data.length === 0 ? (
          <EmptyList isSearching={!!searchList} />
        ) : (
          <AttendanceSearchList data={data} />
        )}
        <AttendDogSubmitButton
          schoolId={schoolId}
          adminId={adminId}
          onSubmitStart={() => setIsSubmitting(true)}
          onSubmitEnd={() => setIsSubmitting(false)}
        />
      </List>
      {blocker.state === "blocked" && (
        <AttendanceCloseModal
          isOpen={true}
          close={() => blocker.reset()}
          action={() => {
            blocker.proceed();
            handleModeChange();
          }}
        />
      )}
    </>
  );
}
