import { handleGetDogDetails } from "apis/attendance";
import { useRecoilState } from "recoil";
import { attendDogDetail } from "store/admin";
import { IDogDetails } from "types/Attendance.type";

const useGetDogDetail = () => {
  const [dogDetail, setDogDetail] = useRecoilState(attendDogDetail);
  const handlerGetDogDetail = async (dogId: number, date: string) => {
    try {
      const data = await handleGetDogDetails(dogId, date);
      if (data.status === 200) {
        const dogDetails: IDogDetails = {
          dogId: data.dogId,
          dogName: data.dogName,
          size: data.size,
          gender: data.gender,
          allRounds: data.allRounds,
          currentRounds: data.currentRounds,
          monthlyTicket: data.monthlyTicket,
          dogAttendances: data.dogAttendances,
          status: data.status,
        };
        setDogDetail(dogDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return handlerGetDogDetail;
};

export default useGetDogDetail;
