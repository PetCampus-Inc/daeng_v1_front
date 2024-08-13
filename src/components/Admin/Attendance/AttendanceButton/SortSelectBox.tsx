import ArrowDownIcon from "assets/svg/arrow-down-icon";
import { useOverlay } from "hooks/common/useOverlay";

import { ArrowDownButton, SelectBox, Text } from "./styles";
import { SortOptionsBottomSheet } from "../AttendanceModal/SortOptionsBottomSheet";

import type { SortOptions } from "../constant";

export function SortSelectBox({ sortName }: { sortName: SortOptions }) {
  const overlay = useOverlay();

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => <SortOptionsBottomSheet isOpen={isOpen} close={close} />);

  return (
    <SelectBox onClick={openPopup}>
      <Text>{sortName}</Text>
      <ArrowDownButton type="button">
        <ArrowDownIcon />
      </ArrowDownButton>
    </SelectBox>
  );
}
