import AttendanceDogCard from "../AttendanceCard/AttendanceDogCard";
import {
  useAttendanceModeActions,
  useAttendanceModeContext
} from "../hooks/useAttendanceModeContext";
import { CardListWrapper, ListWrapper } from "../styles";

import type { Attend } from "types/admin/attendance.type";

export function AttendanceSearchList({ data }: { data: Attend[] }) {
  const selectedDogs = useAttendanceModeContext();
  const { add } = useAttendanceModeActions();

  return (
    <ListWrapper>
      <CardListWrapper>
        {data.map((item) => (
          <AttendanceDogCard
            key={item.dogId}
            attendanceId={item.attendanceId}
            dogName={item.dogName}
            onClick={() => add(item)}
            isSelected={selectedDogs.some((dog) => dog.dogId === item.dogId)}
          />
        ))}
      </CardListWrapper>
    </ListWrapper>
  );
}
