import { EmptyCardContainer } from "../card/styles";
import EmptyCard from "../empty/EmptyDog";
import { SubTitle, Title } from "../styles";

const AttendCareEmpty = () => {
  return (
    <>
      <Title>오늘 관리할 강아지</Title>
      <SubTitle role="alert">관리할 강아지가 없어요 출석 먼저 진행해 주세요</SubTitle>
      <EmptyCardContainer>
        <EmptyCard />
      </EmptyCardContainer>
    </>
  );
};

export default AttendCareEmpty;
