import DogCard from "./Dashboard/DogCard";
import DogNote from "./Dashboard/DogNote";
import { StyledDashboard } from "./styles";

import type { HomeDataType } from "types/member/home.types";

const HomeDashboard = ({ data }: { data: HomeDataType }) => {
  return (
    <StyledDashboard>
      <DogNote data={data} />
      <DogCard data={data} />
    </StyledDashboard>
  );
};

export default HomeDashboard;
