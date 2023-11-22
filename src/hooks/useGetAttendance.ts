import { handleGetAttendDogs, handleGetDogs } from "apis/attendance";
import { useRecoilState } from "recoil";
import { attendDogListInfoAtom, dogListInfoAtom } from "store/admin";

const useGetAttendance = () => {
  const [dogListInfo, setDogListInfo] = useRecoilState(dogListInfoAtom);
  const [attendDogListInfo, setAttendDogListInfo] = useRecoilState(
    attendDogListInfoAtom
  );

  const handleGetAdminInfo = async (schoolId: number) => {
    try {
      const data = await handleGetDogs(schoolId);
      if (data.status === 200) {
        setDogListInfo((prevAdminInfo) => ({
          ...prevAdminInfo,
          data: data.data.map((dogInfo) => ({
            dogId: dogInfo.dogId,
            dogName: dogInfo.dogName,
            allRounds: dogInfo.allRounds,
            currentRounds: dogInfo.currentRounds,
            monthlyTicket: dogInfo.monthlyTicket,
          })),
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAttendDogLists = async (schoolId: number) => {
    try {
      const data = await handleGetAttendDogs(schoolId);
      if (data.status === 200) {
        setAttendDogListInfo((prevAdminInfo) => ({
          ...prevAdminInfo,
          data: data.data.map((dogInfo) => ({
            attendanceId: dogInfo.attendanceId,
            dogId: dogInfo.dogId,
            dogName: dogInfo.dogName,
            allRounds: dogInfo.allRounds,
            currentRounds: dogInfo.currentRounds,
            monthlyTicket: dogInfo.monthlyTicket,
          })),
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { handleGetAdminInfo, handleGetAttendDogLists };
};

export default useGetAttendance;
