import { Flex, Text } from "components/common";
import { useGetTicketDetail } from "hooks/api/admin/ticket";
import { useParams } from "react-router-dom";

import PastTicketCard from "./PastTicketCard";
import TicketCard from "./TicketCard";
import { InnerContainer } from "../styles";

const Ticket = () => {
  const { dogId } = useParams();

  if (!dogId) throw new Error("id가 없습니다");

  const { data } = useGetTicketDetail(Number(dogId));

  return (
    <InnerContainer>
      <Flex direction="column" gap={12}>
        <Text typo="body1_18_B" color="darkBlack">
          이용권 상세정보
        </Text>
        <TicketCard dogId={Number(dogId)} data={data} />
      </Flex>
      {data.ticketHistory && (
        <Flex direction="column" gap={12}>
          <Text typo="body1_18_B" color="darkBlack">
            과거 이용권 정보
          </Text>
          <PastTicketCard data={data.ticketHistory} />
        </Flex>
      )}
    </InnerContainer>
  );
};

export default Ticket;
