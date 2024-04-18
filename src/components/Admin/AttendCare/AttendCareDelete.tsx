import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

import AllSelectButton from "./CareButton/AllSelectButton";
import DeleteDogButton from "./CareButton/DeleteDogButton";
import DeleteDogList from "./CareList/DeleteDogList";
import { SelectedIdsProvider } from "./context/SelectedIdsProvider";
import { DescTitle, ListWrapper, VStack } from "./styles";

import type { ICareDogInfo } from "types/admin/care.types";

interface AttendCareDeleteProps {
  data: ICareDogInfo[];
}

const AttendCareDelete = ({ data }: AttendCareDeleteProps) => {
  const { adminId } = useRecoilValue(adminLoginInfoAtom);
  return (
    <SelectedIdsProvider>
      <VStack>
        <DescTitle>삭제할 강아지 선택</DescTitle>
        <AllSelectButton data={data} />
      </VStack>
      <ListWrapper>
        <DeleteDogList data={data} />
      </ListWrapper>
      <DeleteDogButton adminId={adminId} />
    </SelectedIdsProvider>
  );
};

export default AttendCareDelete;
