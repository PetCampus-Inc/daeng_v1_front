import { PastTicketCard, TicketCard } from "components/Admin/DogDetailInfo/Ticket";
import { Flex, Text } from "components/common";
import { useGetTicketDetail } from "hooks/api/admin/ticket";
import styled from "styled-components";

export function Ticket({ dogId }: { dogId: number }) {
  const { data } = useGetTicketDetail(dogId);

  return (
    <InnerContainer>
      <Flex direction="column" gap={12}>
        <Text typo="body1_18_B" color="gray_1">
          이용권 상세정보
        </Text>
        <TicketCard dogId={Number(dogId)} data={data} />
      </Flex>
      {data.ticketHistory && (
        <Flex direction="column" gap={12}>
          <Text typo="body1_18_B" color="gray_1">
            과거 이용권 정보
          </Text>
          <PastTicketCard data={data.ticketHistory} />
        </Flex>
      )}
    </InnerContainer>
  );
}

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  height: 100%;
  width: 100%;
  padding: 24px 16px 48px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
