import { ConfirmButton } from "styles/StyleModule";

import { ListItem, ListWrapper } from "./styles";
import { BottomSheet, type BottomSheetProps } from "../../../common/BottomSheet";
import { SORT_OPTIONS, SortOptions } from "../constant";

interface SortOptionsBottomSheetProps extends BottomSheetProps {
  sortName: SortOptions;
  onSelect?: (sortName: SortOptions) => void;
}

export function SortOptionsBottomSheet({
  sortName,
  isOpen,
  close,
  onSelect
}: SortOptionsBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <BottomSheet.Title variant="body">정렬</BottomSheet.Title>
        <ListWrapper>
          <ListItem
            className={sortName === SORT_OPTIONS.REGISTERED ? "active" : ""}
            onClick={async () => {
              onSelect?.(SORT_OPTIONS.REGISTERED);
              close();
            }}
          >
            {SORT_OPTIONS.REGISTERED}
          </ListItem>
          <ListItem
            className={sortName === SORT_OPTIONS.PAYMENT ? "active" : ""}
            onClick={async () => {
              onSelect?.(SORT_OPTIONS.PAYMENT);
              close();
            }}
          >
            {SORT_OPTIONS.PAYMENT}
          </ListItem>
          <ListItem
            className={sortName === SORT_OPTIONS.DATE ? "active" : ""}
            onClick={async () => {
              onSelect?.(SORT_OPTIONS.DATE);
              close();
            }}
          >
            {SORT_OPTIONS.DATE}
          </ListItem>
          <ListItem
            className={sortName === SORT_OPTIONS.CHARGE ? "active" : ""}
            onClick={async () => {
              onSelect?.(SORT_OPTIONS.CHARGE);
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
