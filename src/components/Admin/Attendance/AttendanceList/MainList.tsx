import DogCard from "../AttendanceCard/DogCard";
import { ListWrapper, CardListWrapper } from "../styles";

import type { Attendance } from "types/admin/attendance.type";

export function MainList({ data }: { data: Attendance[] }) {
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
