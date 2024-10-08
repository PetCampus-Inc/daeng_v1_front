import { Box, Flex, Text } from "components/common";
import { MonthCalendar } from "components/common/Calendar";
import { useGetDogInfoRecord } from "hooks/api/admin/dogs";

import TicketInfo from "./TicketInfo";

const AttendanceTicketInfo = ({ dogId }: { dogId: number }) => {
  // FIXME useGetMemberDogEnrollmemntInfo와 useGetMemberSchoolInfo 불러오는 데이터가 달라 확인 필요
  const { data } = useGetDogInfoRecord(dogId);

  return (
    <Flex direction="column" gap={42} pt={24} px={16} pb={48}>
      <Flex direction="column" gap={12}>
        <Text typo="body1_18_B" color="gray_1">
          출결
        </Text>
        <Box radius={12} overflow="hidden">
          <MonthCalendar variant="member" minDate={data.registeredDate} tileDate={data.date} />
        </Box>
      </Flex>

      <Flex direction="column" gap={12}>
        <Text typo="body1_18_B" color="gray_1">
          이용권 정보
        </Text>
        <TicketInfo dogId={dogId} />
      </Flex>
    </Flex>
  );
};

export default AttendanceTicketInfo;
