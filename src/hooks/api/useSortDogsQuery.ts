import { LIST } from "constants/option";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
  handleGetDogs,
  handleSortCharge,
  handleSortDate,
  handleSortPayment
} from "apis/attendance";

interface Props {
  sortName: string;
  schoolId: number;
  adminId: number;
}

const fetchSortedDogs = async ({ sortName, schoolId, adminId }: Props) => {
  switch (sortName) {
    case LIST.REGISTERED:
      return await handleGetDogs(schoolId);
    case LIST.PAYMENT:
      return await handleSortPayment(schoolId);
    case LIST.DATE:
      return await handleSortDate(schoolId);
    case LIST.CHARGE:
      return await handleSortCharge(schoolId, adminId);
    default:
      return await handleGetDogs(schoolId);
  }
};

export const useDogListAndSortedList = ({ sortName, schoolId, adminId }: Props) => {
  return useSuspenseQuery({
    queryKey: ["getDogList", sortName],
    queryFn: () => fetchSortedDogs({ sortName, schoolId, adminId })
  });
};
