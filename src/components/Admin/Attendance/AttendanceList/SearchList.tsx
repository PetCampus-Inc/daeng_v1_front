import { memo } from "react";

import DogCard from "../AttendanceCard/DogCard";
import { ListWrapper, CardListWrapper, EmptyText } from "../styles";

import type { IAttendDogInfo } from "types/admin.attendance.type";

type SearchListProps = {
  data?: IAttendDogInfo[];
  type: "search" | "list";
};

const SearchList = memo(({ data, type }: SearchListProps) => {
  if (!data) return null;

  if (data.length > 0) {
    return (
      <ListWrapper>
        <CardListWrapper>
          {data.map((dog) => (
            <DogCard key={dog.dogId} info={dog} />
          ))}
        </CardListWrapper>
      </ListWrapper>
    );
  }

  const emptyMessage =
    type === "search" ? "검색 결과와 일치하는 강아지가 없어요" : "아직 등원한 강아지가 없어요";
  return <EmptyText>{emptyMessage}</EmptyText>;
});

export default SearchList;
