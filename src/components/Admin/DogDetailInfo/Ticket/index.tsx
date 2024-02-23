import { DogDetailInfoText } from "../DogInfo/styles";
import { FlexWrapper, InnerContainer } from "../styles";
import PastTicketCard from "./PastTicketCard";
import TicketCard from "./TicketCard";

const Ticket = () => {
  return (
    <>
      <InnerContainer>
        <FlexWrapper>
          <DogDetailInfoText className="big">이용권 상세정보</DogDetailInfoText>
          <TicketCard />
        </FlexWrapper>
        <FlexWrapper>
          <DogDetailInfoText className="big">과거 이용권 정보</DogDetailInfoText>
          <PastTicketCard />
        </FlexWrapper>
      </InnerContainer>
    </>
  );
};

export default Ticket;
