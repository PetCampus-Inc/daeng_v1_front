import { AllCalendar } from "components/common/Calendar";
import { useGetDogInfoRecord } from "hooks/api/admin/dogs";

export function Calendar({ dogId }: { dogId: number }) {
  const { data } = useGetDogInfoRecord(dogId);
  return <AllCalendar minDate={data.registeredDate} tileDate={data.date} />;
}
