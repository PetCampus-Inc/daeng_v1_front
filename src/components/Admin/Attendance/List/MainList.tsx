import { DogCard } from "../Card/DogCard";
import { CardListWrapper } from "../styles";

import type { Attendance } from "types/admin/attendance.type";

export function MainList({ data }: { data: Attendance[] }) {
  return (
    <CardListWrapper>
      {data.map((dog) => (
        <DogCard key={dog.dogId} info={dog} />
      ))}
    </CardListWrapper>
  );
}
