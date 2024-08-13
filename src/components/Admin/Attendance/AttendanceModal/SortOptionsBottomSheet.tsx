import { useRecoilState } from "recoil";
import { sortOptionState } from "store/form";
import { ConfirmButton } from "styles/StyleModule";

import { ListItem, ListWrapper } from "./styles";
import { BottomSheet, type BottomSheetProps } from "../../../common/BottomSheet";
import { SORT_OPTIONS } from "../constant";

export function SortOptionsBottomSheet({ isOpen, close }: BottomSheetProps) {
  const [sortName, setSortName] = useRecoilState(sortOptionState);

  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <BottomSheet.Title variant="body">정렬</BottomSheet.Title>
        <ListWrapper>
          <ListItem
            className={sortName === SORT_OPTIONS.REGISTERED ? "active" : ""}
            onClick={async () => {
              setSortName(SORT_OPTIONS.REGISTERED);
              close();
            }}
          >
            {SORT_OPTIONS.REGISTERED}
          </ListItem>
          <ListItem
            className={sortName === SORT_OPTIONS.PAYMENT ? "active" : ""}
            onClick={async () => {
              setSortName(SORT_OPTIONS.PAYMENT);
              close();
            }}
          >
            {SORT_OPTIONS.PAYMENT}
          </ListItem>
          <ListItem
            className={sortName === SORT_OPTIONS.DATE ? "active" : ""}
            onClick={async () => {
              setSortName(SORT_OPTIONS.DATE);
              close();
            }}
          >
            {SORT_OPTIONS.DATE}
          </ListItem>
          <ListItem
            className={sortName === SORT_OPTIONS.CHARGE ? "active" : ""}
            onClick={async () => {
              setSortName(SORT_OPTIONS.CHARGE);
              close();
            }}
          >
            {SORT_OPTIONS.CHARGE}
          </ListItem>
        </ListWrapper>
        <ConfirmButton onClick={() => close()}>닫기</ConfirmButton>
      </BottomSheet.Content>
    </BottomSheet>
  );
}
