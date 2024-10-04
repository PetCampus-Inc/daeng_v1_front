import { Box } from "components/common";
import { MonthCalendar } from "components/common/Calendar";
import { useGetDogInfoRecord } from "hooks/api/admin/dogs";

export function Calendar({ dogId }: { dogId: number }) {
  const { data } = useGetDogInfoRecord(dogId);
  return (
    <Box pt={22} pb={20}>
      <MonthCalendar minDate={data.registeredDate} tileDate={data.date} variant="admin" />
    </Box>
  );
}
