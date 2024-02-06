import {
  handleGetAttendSearchDogs,
  handleGetSearchDogs,
} from "apis/attendance";
import { useState } from "react";
import { IAttendDogLists, IDogsList } from "types/Attendance.type";

const useGetSearchList = () => {
  const [searchDogResults, setSearchDogResults] = useState<IDogsList[]>([]);
  const [searchAttendDogResults, setSearchAttendDogResults] = useState<
    IAttendDogLists[]
  >([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const handlerGetSearchResult = async (
    schoolId: number,
    searchText: string
  ) => {
    if (searchText === "") {
      return;
    }
    try {
      const data = await handleGetSearchDogs(schoolId, searchText);
      if (data.status === 200) {
        setSearchDogResults(data.data);
        setIsSearchClicked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerGetAttendSearchDog = async (
    schoolId: number,
    searchText: string
  ) => {
    if (searchText === "") {
      return;
    }
    try {
      const data = await handleGetAttendSearchDogs(schoolId, searchText);
      if (data.status === 200) {
        setSearchAttendDogResults(data.data);
        setIsSearchClicked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handlerGetSearchResult,
    handlerGetAttendSearchDog,
    searchDogResults,
    isSearchClicked,
    searchAttendDogResults,
    setIsSearchClicked,
  };
};

export default useGetSearchList;
