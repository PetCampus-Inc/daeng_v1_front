import { ICareDogInfo } from "types/admin.caredog.type";

import { MainDogGrid } from "./styles";
import MainDogCard from "../CareCard/MainDogCard";

interface MainDogListProps {
  data: ICareDogInfo[];
}

const MainDogList = ({ data }: MainDogListProps) => {
  return (
    <MainDogGrid>
      {data.map((item) => (
        <MainDogCard
          key={item.dogId}
          attendanceId={item.attendanceId}
          dogId={item.dogId}
          dogName={item.dogName}
          adminName={item.adminName}
          lastPhotoTime={item.lastPhotoTime}
          agendaWriting={item.agendaWriting}
        />
      ))}
    </MainDogGrid>
  );
};

export default MainDogList;
