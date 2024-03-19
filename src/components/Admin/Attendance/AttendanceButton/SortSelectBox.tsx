import ArrowDownIcon from "assets/svg/arrow-down-icon";
import useBottomSheet from "hooks/common/useBottomSheet";
import { memo, type SetStateAction } from "react";

import { ArrowDownButton, SelectBox, Text } from "./styles";
import SortOptionListBottomSheet from "../AttendanceModal/SortOptionListBottomSheet";

export type TSortSelectBoxProps = {
  sortName: string;
  setSortName: React.Dispatch<SetStateAction<string>>;
};

const SortSelectBox = memo(({ sortName, setSortName }: TSortSelectBoxProps) => {
  const { isVisible, open, close } = useBottomSheet(false);

  return (
    <>
      <SortOptionListBottomSheet
        sortName={sortName}
        setSortName={setSortName}
        isVisible={isVisible}
        close={close}
      />
      <SelectBox onClick={open}>
        <Text>{sortName}</Text>
        <ArrowDownButton type="button">
          <ArrowDownIcon />
        </ArrowDownButton>
      </SelectBox>
    </>
  );
});

export default SortSelectBox;
