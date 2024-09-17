import ArrowDownIcon from "assets/svg/arrow-down-icon";
import { useOverlay } from "hooks/common/useOverlay";

import { ArrowDownButton, SelectBox, Text } from "./styles";
import { SortOptionsBottomSheet } from "../Dialog/SortOptionsBottomSheet";

import type { SortOptions } from "../constant";

interface SortSelectBoxProps {
  sortName: SortOptions;
  onSelect?: (sortName: SortOptions) => void;
}

export function SortSelectBox({ sortName, onSelect }: SortSelectBoxProps) {
  const overlay = useOverlay();

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <SortOptionsBottomSheet
        sortName={sortName}
        isOpen={isOpen}
        close={close}
        onSelect={onSelect}
      />
    ));

  return (
    <SelectBox onClick={openPopup}>
      <Text>{sortName}</Text>
      <ArrowDownButton type="button">
        <ArrowDownIcon />
      </ArrowDownButton>
    </SelectBox>
  );
}
