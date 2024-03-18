import SimpleButton from "components/common/Button/SimpleButton";
import { useContext } from "react";

import { SelectedIdsContext } from "../context/SelectedIdsProvider";

import type { ICareDogInfo } from "types/admin.caredog.type";

// FIXME: 버튼에서 data를 읽어야하는게 이상하긴하당.. 괜찮나? 재사용성은 떨어지는듯..^^

interface AllSelectButtonProps {
  data: ICareDogInfo[];
}

const AllSelectButton = ({ data }: AllSelectButtonProps) => {
  const selectIdsContext = useContext(SelectedIdsContext);

  // 선택된 항목의 수가 전체 데이터의 수와 같은지 여부를 확인
  const isAllSelected = selectIdsContext?.selectedIds.size === data.length;

  const handleClick = (data: ICareDogInfo[]) => {
    selectIdsContext?.selectAll(data);
  };

  const buttonText = isAllSelected ? "전체 해제" : "전체 선택";
  const buttonColorScheme = isAllSelected ? "gray" : "primary";

  return (
    <SimpleButton onClick={() => handleClick(data)} colorScheme={buttonColorScheme}>
      {buttonText}
    </SimpleButton>
  );
};

export default AllSelectButton;
