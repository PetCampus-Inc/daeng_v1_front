import BoneIcon from "assets/svg/bone-icon";
import PoopStatusIcon from "assets/svg/poop-status-icon";
import { Flex, Text } from "components/common";
import PoopStatusGroup from "components/common/PoopStatusGroup";
import { format } from "date-fns";
import { useDogInfoAgenda } from "hooks/api/member/dogs";
import { useSearchParams } from "react-router-dom";

import { EmptyAgenda } from "./EmptyAgenda";
import { AgendaContainer } from "./styles";

import type { DogInfoAgenda } from "types/member/dogs";

export const AgendaView = ({ data }: { data: DogInfoAgenda }) => {
  return (
    <Flex direction="column" gap={44} mt={24}>
      <Text typo="label2_14_R" color="darkBlack">
        {data.agendaNote}
      </Text>
      <Flex direction="column" gap={4}>
        <Flex gap={4}>
          <BoneIcon />
          <Text typo="label1_16_B" color="darkBlack">
            간식
          </Text>
        </Flex>
        <Text typo="label2_14_R" color="darkBlack">
          {data.snack}
        </Text>
      </Flex>
      <Flex direction="column" gap={4}>
        <Flex gap={4}>
          <PoopStatusIcon />
          <Text typo="label1_16_B" color="darkBlack">
            배변 상태
          </Text>
        </Flex>
        <Text typo="label2_14_R" color="darkBlack">
          {data.poopMemo}
        </Text>
        <PoopStatusGroup selected={data.poop} size="s" readOnly />
      </Flex>
    </Flex>
  );
};

export const DailyAgenda = ({ id }: { id: number }) => {
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") || format(new Date(), "yyyy-MM-dd");
  const { data } = useDogInfoAgenda(id, date);

  return (
    <AgendaContainer>
      <Text as="p" typo="label1_16_B" color="primaryColor" textAlign="center">
        {format(date, "yyyy . MM . dd")}
      </Text>
      {data ? <AgendaView data={data} /> : <EmptyAgenda />}
    </AgendaContainer>
  );
};
