import { CareDogInfo } from "types/admin/care.types";

import { MainDogGrid } from "./styles";
import MainDogCard from "../card/MainDogCard";

interface MainDogListProps {
  data: CareDogInfo[];
}

const MainDogList = ({ data }: MainDogListProps) => {
  return (
    <MainDogGrid>
      {data.map((item) => (
        <MainDogCard key={item.dogId} info={item} />
      ))}
    </MainDogGrid>
  );
};

export default MainDogList;
