import AlertFilledIcon from "assets/svg/alert-filled-icon";
import PencilFilledIcon from "assets/svg/pencil-filled-icon";
import { Box, Flex, Text } from "components/common";
import { AGENDA_STATUS } from "types/member/dogs";

import type { DogInfoAgendaData } from "types/admin/attendance.type";
interface DailyNoticeProps {
  status?: DogInfoAgendaData["status"];
}
export function DailyAgendaStatus({ status }: DailyNoticeProps) {
  const statusText = (status?: string) => {
    switch (status) {
      case AGENDA_STATUS.NOT_YET:
        return "알림장을 아직 작성하지 않았어요";
      case AGENDA_STATUS.WRITING:
        return "알림장을 작성중이에요";
      default:
        return "해당 날짜에 등원하지 않았어요";
    }
  };

  return (
    <Box
      display={"flex"}
      justify={"center"}
      align={"center"}
      height={248}
      borderRadius={"rectangle"}
      bgColor={"gray_5"}
    >
      <Flex justify={"center"} align={"center"} flex={1} gap={6}>
        {status === AGENDA_STATUS.WRITING ? (
          <PencilFilledIcon w={24} h={24} />
        ) : (
          <AlertFilledIcon w={24} h={24} colorScheme="darkgray" rx={6} />
        )}
        <Text typo={"label2_14_R"} color={"gray_2"}>
          {statusText(status)}
        </Text>
      </Flex>
    </Box>
  );
}
