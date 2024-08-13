import { useAttendDogSearchQuery, useGetAttendDogList } from "hooks/api/admin/attendance";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useState } from "react";
import { useBlocker } from "react-router-dom";

import AttendDogSubmitButton from "./AttendanceButton/AttendDogSubmitButton";
import { AttendanceAvatar } from "./AttendanceList/AttendanceAvatar";
import { AttendanceSearchList } from "./AttendanceList/AttendanceSearchList";
import { AttendanceCloseModal } from "./AttendanceModal/AttendanceCloseModal";
import { EmptyList } from "./EmptyList";
import { useAttendanceModeContext } from "./hooks/useAttendanceModeContext";
import { ModeSearchContext } from "./hooks/useSearchContext";
import { RootContainer, ScrollableContent } from "./styles";

export function AttendanceMode() {
  const { schoolId, adminId } = useAdminInfo();
  const { data: dogList } = useGetAttendDogList(schoolId);

  const { searchText, isFocused } = ModeSearchContext.useSearchContext();
  const { data: searchList } = useAttendDogSearchQuery(schoolId, searchText);

  const selectedDogs = useAttendanceModeContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const data = searchText ? searchList : dogList;

  const blocker = useBlocker(() => selectedDogs.length > 0 && !isSubmitting);

  return (
    <>
      <RootContainer isFocus={isFocused} className="attend">
        <AttendanceAvatar />
        <ScrollableContent>
          {!data || data.length === 0 ? (
            <EmptyList isSearching={!!searchList} />
          ) : (
            <AttendanceSearchList data={data} />
          )}
        </ScrollableContent>
      </RootContainer>
      <AttendDogSubmitButton
        schoolId={schoolId}
        adminId={adminId}
        onSubmitStart={() => setIsSubmitting(true)}
        onSubmitEnd={() => setIsSubmitting(false)}
      />
      {blocker.state === "blocked" && (
        <AttendanceCloseModal
          isOpen={true}
          close={() => blocker.reset()}
          action={() => {
            blocker.proceed();
          }}
        />
      )}
    </>
  );
}
