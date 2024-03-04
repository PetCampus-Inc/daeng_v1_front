import AttendanceSearchList from "./AttendanceSearchList";
import { useGetAttendDogList } from "hooks/api/useGetAttendanceQuery";

interface DogListProps {
  schoolId: number;
}

const AttendanceList = ({ schoolId }: DogListProps) => {
  const { data } = useGetAttendDogList(schoolId);

  return <AttendanceSearchList data={data || []} />;
};

export default AttendanceList;
