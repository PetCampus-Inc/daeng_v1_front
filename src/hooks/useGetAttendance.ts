import { handleGetDogs } from "apis/attendance";
import { useRecoilState } from "recoil";
import { adminInfoAtom } from "store/admin";

const useGetAttendance = () => {
  const [adminInfo, setAdminInfo] = useRecoilState(adminInfoAtom);

  const handleGetAdminInfo = async (schoolId: number) => {
    try {
      const data = await handleGetDogs(schoolId);
      if (data.status === 200) {
        setAdminInfo((prevAdminInfo) => ({
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
  return { handleGetAdminInfo };
};

export default useGetAttendance;
