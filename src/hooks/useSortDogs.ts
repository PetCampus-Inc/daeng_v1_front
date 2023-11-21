import {
  handleSortCharge,
  handleSortDate,
  handleSortPayment,
  handleSortRegistered,
} from "apis/attendance";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { adminInfoAtom } from "store/admin";
import { IDogsList } from "types/Attendance.type";

const useSortDogs = () => {
  const dogLists = useRecoilValue(adminInfoAtom).data;
  const [newDogsList, setNewDogsList] = useState<IDogsList[]>(dogLists);

  const handleGetSortRegistered = async (schoolId: number) => {
    try {
      const data = await handleSortRegistered(schoolId);
      if (data.status === 200) {
        setNewDogsList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSortPayment = async (schoolId: number) => {
    try {
      const data = await handleSortPayment(schoolId);
      if (data.status === 200) {
        setNewDogsList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSortCharge = async (schoolId: number, adminId: number) => {
    try {
      const data = await handleSortCharge(schoolId, adminId);
      if (data.status === 200) {
        setNewDogsList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSortDate = async (schoolId: number) => {
    try {
      const data = await handleSortDate(schoolId);
      if (data.status === 200) {
        setNewDogsList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    handleGetSortRegistered,
    handleGetSortPayment,
    handleGetSortCharge,
    handleGetSortDate,
    newDogsList,
  };
};

export default useSortDogs;
