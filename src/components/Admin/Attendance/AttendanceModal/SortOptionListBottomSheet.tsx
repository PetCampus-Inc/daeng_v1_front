import { LIST } from "constants/option";

import BottomSheet from "components/common/BottomSheet";
import { ConfirmButton } from "styles/StyleModule";

import { ListItem, ListWrapper } from "./styles";

import type { TSortSelectBoxProps } from "../AttendanceButton/SortSelectBox";

export type TBottomSheetProps = {
  isVisible: boolean;
  close: () => void;
};

type TSortOptionList = TSortSelectBoxProps & TBottomSheetProps;

const SortOptionListBottomSheet = ({
  isVisible,
  close,
  sortName,
  setSortName
}: TSortOptionList) => {
  return (
    <BottomSheet isOpen={isVisible} onClose={close}>
      <BottomSheet.Content>
        <BottomSheet.Title variant="body">정렬</BottomSheet.Title>
        <ListWrapper>
          <ListItem
            className={sortName === LIST.REGISTERED ? "active" : ""}
            onClick={async () => {
              setSortName(LIST.REGISTERED);
            }}
          >
            {LIST.REGISTERED}
          </ListItem>
          <ListItem
            className={sortName === LIST.PAYMENT ? "active" : ""}
            onClick={async () => {
              setSortName(LIST.PAYMENT);
            }}
          >
            {LIST.PAYMENT}
          </ListItem>
          <ListItem
            className={sortName === LIST.DATE ? "active" : ""}
            onClick={async () => {
              setSortName(LIST.DATE);
            }}
          >
            {LIST.DATE}
          </ListItem>
          <ListItem
            className={sortName === LIST.CHARGE ? "active" : ""}
            onClick={async () => {
              setSortName(LIST.CHARGE);
            }}
          >
            {LIST.CHARGE}
          </ListItem>
        </ListWrapper>
        <ConfirmButton onClick={() => close()}>닫기</ConfirmButton>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default SortOptionListBottomSheet;
