import { useRecoilState } from "recoil";
import { attendDogListInfoAtom } from "store/admin";

import AttendanceDogCard from "./AttendanceCard/AttendanceDogCard";
import { CardListWrapper, EmptyText, ListWrapper } from "./styles";

import type { IAttendDogInfo } from "types/admin.attendance.type";

interface AttendanceSearchListProps {
  data?: IAttendDogInfo[];
  type: "search" | "list";
}

const AttendanceSearchList = ({ data, type }: AttendanceSearchListProps) => {
  const [selectedList, setSelectedList] = useRecoilState(attendDogListInfoAtom);

  if (!data) return null;

  const handleCardClick = (dog: IAttendDogInfo) => {
    setSelectedList((prev) => {
      const isSelected = prev.some((selectedDog) => selectedDog.dogId === dog.dogId);
      if (isSelected) {
        return prev.filter((selectedDog) => selectedDog.dogId !== dog.dogId);
      } else {
        return [...prev, dog];
      }
    });
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
              onClick={() => handleCardClick(item)}
              isSelected={selectedList.some((dog) => dog.dogId === item.dogId)}
            />
          ))}
        </CardListWrapper>
      </ListWrapper>
    );
  }

  const emptyMessage =
    type === "search" ? "검색 결과와 일치하는 강아지가 없어요" : "아직 등원한 강아지가 없어요";
  return <EmptyText>{emptyMessage}</EmptyText>;
};

export default AttendanceSearchList;
