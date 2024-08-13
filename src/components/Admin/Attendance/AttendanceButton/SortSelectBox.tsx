import ArrowDownIcon from "assets/svg/arrow-down-icon";
import { useOverlay } from "hooks/common/useOverlay";

import { ArrowDownButton, SelectBox, Text } from "./styles";
import SortOptionListBottomSheet from "../AttendanceModal/SortOptionListBottomSheet";

import type { SortOptions } from "../constant";

export function SortSelectBox({ sortName }: { sortName: SortOptions }) {
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
}
