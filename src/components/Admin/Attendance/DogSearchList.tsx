import { ListWrapper, CardListWrapper } from "./styles";
import DogCard from "./DogCard/DogCard";

type DogSearchListProps = {
  data: any;
};

const DogSearchList = ({ data }: DogSearchListProps) => {
  return (
    <ListWrapper>
      <CardListWrapper>
        {data.map((item: any) => (
          <DogCard
            key={item.dogId}
            dogId={item.dogId}
            name={item.dogName}
            allRounds={item.allRounds}
            rounds={item.currentRounds}
            monthly={item.monthlyTicket}
          />
        ))}
      </CardListWrapper>
    </ListWrapper>
  );
};

export default DogSearchList;
