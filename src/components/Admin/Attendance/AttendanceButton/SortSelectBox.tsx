import ArrowDownIcon from "assets/svg/arrow-down-icon";
import useOverlay from "hooks/common/useOverlay/useOverlay";
import { memo, type SetStateAction } from "react";

import { ArrowDownButton, SelectBox, Text } from "./styles";
import SortOptionListBottomSheet from "../AttendanceModal/SortOptionListBottomSheet";

export type TSortSelectBoxProps = {
  sortName: string;
  setSortName: React.Dispatch<SetStateAction<string>>;
};

const SortSelectBox = memo(({ sortName, setSortName }: TSortSelectBoxProps) => {
  const overlay = useOverlay();

  // FIXME: SortSelectBox내부에서 sortName 상태 관리하도록 변경 필요!
  const openCallPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <SortOptionListBottomSheet
        sortName={sortName}
        setSortName={setSortName}
        isVisible={isOpen}
        close={close}
      />
    ));

  return (
    <SelectBox onClick={openCallPopup}>
      <Text>{sortName}</Text>
      <ArrowDownButton type="button">
        <ArrowDownIcon />
      </ArrowDownButton>
    </SelectBox>
  );
});

export default SortSelectBox;
