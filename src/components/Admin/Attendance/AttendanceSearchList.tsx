import { useRecoilState } from "recoil";
import { attendDogListInfoAtom } from "store/admin";
import AttendanceDogCard from "./AttendanceDogCard";
import type { IAttendDogsInfo, IAttendDogLists } from "types/Attendance.type";
import { CardListWrapper, EmptyText, ListWrapper } from "./styles";

interface AttendanceSearchListProps {
  data?: IAttendDogsInfo;
}

const AttendanceSearchList = ({ data }: AttendanceSearchListProps) => {
  const [selectedDog, setDogList] = useRecoilState(attendDogListInfoAtom);

  const handleCardClick = (dog: IAttendDogLists) => {
    setDogList((prev) => {
      const isSelected = prev.some((selectedDog) => selectedDog.dogId === dog.dogId);
      if (isSelected) {
        return prev.filter((selectedDog) => selectedDog.dogId !== dog.dogId);
      } else {
        return [...prev, dog];
      }
    });
  };

  if (!data || data.length === 0) {
    return <EmptyText>검색 결과와 일치하는 강아지가 없어요</EmptyText>;
  }

  return (
    <ListWrapper>
      <CardListWrapper>
        {data.map((item) => (
          <AttendanceDogCard
            key={item.dogId}
            attendanceId={item.attendanceId}
            dogName={item.dogName}
            onClick={() => handleCardClick(item)}
            isSelected={selectedDog.some((dog) => dog.dogId === item.dogId)}
          />
        ))}
      </CardListWrapper>
    </ListWrapper>
  );
};

export default AttendanceSearchList;
