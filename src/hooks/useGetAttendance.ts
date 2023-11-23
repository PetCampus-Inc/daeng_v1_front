import {
  handleGetAttendCareDogs,
  handleGetAttendDogs,
  handleGetDogs,
} from "apis/attendance";
import { useRecoilState } from "recoil";
import {
  attendCareDogListAtom,
  attendDogListInfoAtom,
  dogListInfoAtom,
} from "store/admin";

const useGetAttendance = () => {
  const [dogListInfo, setDogListInfo] = useRecoilState(dogListInfoAtom);
  const [attendDogListInfo, setAttendDogListInfo] = useRecoilState(
    attendDogListInfoAtom
  );
  const [attendCareDogs, setAttendCareDogs] = useRecoilState(
    attendCareDogListAtom
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

  const handlerGetAttendCareDogs = async (schoolId: number) => {
    try {
      const data = await handleGetAttendCareDogs(schoolId);
      if (data.status === 200) {
        setAttendCareDogs((prevInfo) => ({
          ...prevInfo,
          data: data.data.map((data) => ({
            attendanceId: data.attendanceId,
            dogId: data.dogId,
            dogName: data.dogName,
            status: data.status,
            adminName: data.adminName,
          })),
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleGetAdminInfo,
    handleGetAttendDogLists,
    handlerGetAttendCareDogs,
  };
};

export default useGetAttendance;
