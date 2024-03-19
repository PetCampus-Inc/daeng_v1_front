import { memo } from "react";

import AttendanceDogCard from "../AttendanceCard/AttendanceDogCard";
import { useSelectedDogs } from "../context/SelectedDogProvider";
import { CardListWrapper, EmptyText, ListWrapper } from "../styles";

import type { IAttendDogInfo } from "types/admin.attendance.type";

interface AttendanceSearchListProps {
  data?: IAttendDogInfo[];
  type: "search" | "list";
}

const AttendanceSearchList = memo(({ data, type }: AttendanceSearchListProps) => {
  const [selectedDogs, dispatch] = useSelectedDogs();

  if (!data) return null;

  const addDog = (dog: IAttendDogInfo) => {
    dispatch({ type: "ADD_DOG", payload: dog });
  };

  if (data.length > 0) {
    return (
      <ListWrapper>
        <CardListWrapper>
          {data.map((item) => (
            <AttendanceDogCard
              key={item.dogId}
              attendanceId={item.attendanceId}
              dogName={item.dogName}
              onClick={() => addDog(item)}
              isSelected={selectedDogs.some((dog) => dog.dogId === item.dogId)}
            />
          ))}
        </CardListWrapper>
      </ListWrapper>
    );
  }

  const emptyMessage =
    type === "search" ? "검색 결과와 일치하는 강아지가 없어요" : "아직 등원한 강아지가 없어요";
  return <EmptyText>{emptyMessage}</EmptyText>;
});

export default AttendanceSearchList;
