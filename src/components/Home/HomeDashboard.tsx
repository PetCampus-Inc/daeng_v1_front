import DogCard from "./Dashboard/DogCard";
import DogNote from "./Dashboard/DogNote";
import { StyledDashboard } from "./styles";

import type { IHome } from "types/member/home.types";

const HomeDashboard = ({ data }: { data: IHome }) => {
  return (
    <StyledDashboard>
      <DogNote data={data} />
      <DogCard data={data} />
    </StyledDashboard>
  );
};

export default HomeDashboard;
