import { TSortOptionList } from "constants/option";

import ArrowDownIcon from "assets/svg/arrow-down-icon";
import useOverlay from "hooks/common/useOverlay/useOverlay";
import { memo } from "react";

import { ArrowDownButton, SelectBox, Text } from "./styles";
import SortOptionListBottomSheet from "../AttendanceModal/SortOptionListBottomSheet";

const SortSelectBox = memo(({ sortName }: { sortName: TSortOptionList }) => {
  const overlay = useOverlay();

  const openCallPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <SortOptionListBottomSheet isOpen={isOpen} close={close} />
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
