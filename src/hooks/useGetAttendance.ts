import { handleGetDogs } from "apis/attendance";
import { useRecoilState } from "recoil";
import { adminInfoAtom } from "store/admin";

const useGetAttendance = () => {
  const [adminInfo, setAdminInfo] = useRecoilState(adminInfoAtom);

  const handleGetAdminInfo = async (adminId: number) => {
    try {
      const data = await handleGetDogs(adminId);
      if (data.status === 200) {
        setAdminInfo((prevAdminInfo) => ({
          ...prevAdminInfo,
          data: {
            adminName: data.data.adminName,
            role: data.data.role,
            dogs: data.data.dogs,
          },
        }));
      }
      console.log(adminInfo);
    } catch (error) {
      console.log(error);
    }
  };
  return { handleGetAdminInfo };
};

export default useGetAttendance;
