import DogCard from "./AttendanceCard/DogCard";
import { ListWrapper, CardListWrapper, EmptyText } from "./styles";

type SearchListProps = {
  data?: any[];
};

const SearchList = ({ data }: SearchListProps) => {
  // TODO: 데이터패칭이 실패한 경우, 또는 패칭이 안된 경우 에러 핸들링 필요!
  if (!data) return null;

  return (
    <>
      {data.length > 0 ? (
        <ListWrapper>
          <CardListWrapper>
            {data.map((item) => (
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
      ) : (
        <EmptyText>검색 결과와 일치하는 강아지가 없어요</EmptyText>
      )}
    </>
  );
};

export default SearchList;