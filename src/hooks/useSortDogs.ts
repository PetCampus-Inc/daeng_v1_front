import {
  handleSortCharge,
  handleSortDate,
  handleSortPayment,
  handleSortRegistered,
} from "apis/attendance";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { adminInfoAtom } from "store/admin";
import { IDogsList, ISearchDogs } from "types/Attendance.type";

const useSortDogs = () => {
  const [newDogsList, setNewDogsList] = useState<IDogsList[]>([]);
  const setDogLists = useSetRecoilState(adminInfoAtom);

  const changeList = (newdata: IDogsList[]) => {
    setDogLists((prevInfo) => ({
      ...prevInfo,
      data: {
        ...prevInfo.data,
        dog: newdata,
      },
    }));
  };

  const handleGetSortRegistered = async (adminId: number) => {
    try {
      const data = await handleSortRegistered(adminId);
      if (data.status === 200) {
        setNewDogsList(data.data);
        changeList(newDogsList);
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
        changeList(newDogsList);
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
        changeList(newDogsList);
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
        changeList(newDogsList);
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
  };
};

export default useSortDogs;
