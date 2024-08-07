import { memo } from "react";

import DogCard from "../AttendanceCard/DogCard";
import { ListWrapper, CardListWrapper, EmptyText } from "../styles";

import type { AttendanceData } from "types/admin/attendance.type";

type SearchListProps = {
  data?: AttendanceData[];
  type: "search" | "list";
};

const SearchList = memo(({ data, type }: SearchListProps) => {
  const emptyMessage =
    type === "search" ? "검색 결과와 일치하는 강아지가 없어요" : "아직 등원한 강아지가 없어요";

  if (!data || data.length === 0) {
    return <EmptyText>{emptyMessage}</EmptyText>;
  }

  return (
    <ListWrapper>
      <CardListWrapper>
        {data.map((dog) => (
          <DogCard key={dog.dogId} info={dog} />
        ))}
      </CardListWrapper>
    </ListWrapper>
  );
});

export default SearchList;
