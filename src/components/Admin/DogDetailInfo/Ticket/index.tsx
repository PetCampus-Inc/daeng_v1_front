import useGetTicketDetail from "hooks/api/useGetTicketDetail";
import { useLocation } from "react-router-dom";

import PastTicketCard from "./PastTicketCard";
import TicketCard from "./TicketCard";
import { DogDetailInfoText } from "../DogInfo/styles";
import { FlexWrapper, InnerContainer } from "../styles";

const Ticket = () => {
  const dogId = useLocation().pathname.split("/").pop();
  const { data } = useGetTicketDetail(Number(dogId) || -1);
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

      {/* <NewTicketBottomSheet isVisible={isVisible} close={close} currentData={ticketInfo} /> */}
    </>
  );
};

export default Ticket;
