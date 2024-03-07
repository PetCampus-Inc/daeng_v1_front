import { useGetAttendDogList } from "hooks/api/useGetAttendanceQuery";

import AttendanceSearchList from "./AttendanceSearchList";

interface DogListProps {
  schoolId: number;
}

const AttendanceList = ({ schoolId }: DogListProps) => {
  const { data } = useGetAttendDogList(schoolId);

  return <AttendanceSearchList data={data || []} />;
};

export default AttendanceList;
