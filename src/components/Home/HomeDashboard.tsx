import DogCard from "./Dashboard/DogCard";
import DogNote from "./Dashboard/DogNote";
import { StyledDashboard } from "./styles";

import type { HomeInfoType } from "types/member/main.types";

const HomeDashboard = ({ data }: { data: HomeInfoType }) => {
  return (
    <StyledDashboard>
      <DogNote data={data} />
      <DogCard data={data} />
    </StyledDashboard>
  );
};

export default HomeDashboard;
