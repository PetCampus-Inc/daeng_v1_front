import useGetTicketDetail from "hooks/api/useGetTicketDetail";
import { DogDetailInfoText } from "../DogInfo/styles";
import { FlexWrapper, InnerContainer } from "../styles";
import PastTicketCard from "./PastTicketCard";
import TicketCard from "./TicketCard";

const Ticket = () => {
  const { data } = useGetTicketDetail(2); //FIXME: 나영이꺼 머지되면 dogId queryString으로 받아오기
  const { ticketHistory, ...ticketInfo } = data;
  return (
    <>
      <InnerContainer>
        <FlexWrapper>
          <DogDetailInfoText className="big">이용권 상세정보</DogDetailInfoText>
          <TicketCard data={ticketInfo} />
        </FlexWrapper>
        <FlexWrapper>
          <DogDetailInfoText className="big">과거 이용권 정보</DogDetailInfoText>
          <PastTicketCard data={ticketHistory} />
        </FlexWrapper>
      </InnerContainer>
    </>
  );
};

export default Ticket;
