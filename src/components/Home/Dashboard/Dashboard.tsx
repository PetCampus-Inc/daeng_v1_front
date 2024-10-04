import DogCard from "./DogCard";
import DogNote from "./DogNote";
import { StyledDashboard } from "./styles";

import type { HomeDataType } from "types/member/main.types";

export function Dashboard({ data }: { data: HomeDataType }) {
  return (
    <StyledDashboard>
      <DogNote data={data} />
      <DogCard data={data} />
    </StyledDashboard>
  );
}
