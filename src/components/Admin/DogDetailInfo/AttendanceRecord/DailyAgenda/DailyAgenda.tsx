import { DailyAgendaStatus } from "components/Admin/DogDetailInfo/AttendanceRecord/DailyAgenda/DailyAgendaStatus";
import { Flex, Text } from "components/common";
import PoopStatusGroup from "components/common/PoopStatusGroup";
import { useGetDogInfoAgenda } from "hooks/api/admin/dogs";
import { AGENDA_STATUS } from "types/member/dogs";

interface DailyNoticeProps {
  dogId: number;
  date: string;
}
export function DailyAgenda({ dogId, date }: DailyNoticeProps) {
  const { data } = useGetDogInfoAgenda(dogId, date);

  if (!data || data.status !== AGENDA_STATUS.COMPLETE) {
    return <DailyAgendaStatus status={data?.status} />;
  }

  return (
    <>
      <Flex direction={"column"} gap={12}>
        <Text as={"p"} typo={"label1_16_B"} color={"darkBlack"}>
          알림장
        </Text>
        <Text as={"p"} typo={"label1_16_R"} color={"gray_1"}>
          {data.agendaNote ? data.agendaNote : "전달 사항이 없습니다."}
        </Text>
      </Flex>

      <Flex direction={"column"} gap={12}>
        <Text as={"p"} typo={"label1_16_B"} color={"darkBlack"}>
          간식
        </Text>
        <Text as={"p"} typo={"label1_16_R"} color={"gray_1"}>
          {data.snack ? data.snack : "전달 사항이 없습니다."}
        </Text>
      </Flex>

      <Flex direction={"column"} gap={12}>
        <Text as={"p"} typo={"label1_16_B"} color={"darkBlack"}>
          배변 상태
          <PoopStatusGroup selected={data.poop} readOnly />
        </Text>
        <Text as={"p"} typo={"label1_16_R"} color={"gray_1"}>
          {data.poopMemo ? data.poopMemo : "전달 사항이 없습니다."}
        </Text>
      </Flex>
    </>
  );
}
