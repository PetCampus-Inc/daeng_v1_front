import { AttendDogCard } from "../Card/AttendDogCard";
import {
  useAttendanceModeActions,
  useAttendanceModeContext
} from "../hooks/useAttendanceModeContext";
import { CardListWrapper } from "../styles";

import type { Attend } from "types/admin/attendance.type";

export function AttendanceSearchList({ data }: { data: Attend[] }) {
  const selectedDogs = useAttendanceModeContext();
  const { add } = useAttendanceModeActions();

  return (
    <CardListWrapper>
      {data.map((item) => (
        <AttendDogCard
          key={item.dogId}
          dogProfileUri={item.dogProfileUri}
          attendanceId={item.attendanceId}
          dogName={item.dogName}
          onClick={() => add(item)}
          isSelected={selectedDogs.some((dog) => dog.dogId === item.dogId)}
        />
      ))}
    </CardListWrapper>
  );
}
