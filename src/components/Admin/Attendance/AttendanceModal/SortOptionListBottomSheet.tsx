import { LIST } from "constants/option";

import BottomSheet, { type IBottomSheetProps } from "components/common/BottomSheet";
import { useRecoilState } from "recoil";
import { sortOptionAtom } from "store/overlay";
import { ConfirmButton } from "styles/StyleModule";

import { ListItem, ListWrapper } from "./styles";

const SortOptionListBottomSheet = ({ isOpen, close }: IBottomSheetProps) => {
  const [sortName, setSortName] = useRecoilState(sortOptionAtom);

  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <BottomSheet.Title variant="body">정렬</BottomSheet.Title>
        <ListWrapper>
          <ListItem
            className={sortName === LIST.REGISTERED ? "active" : ""}
            onClick={async () => {
              setSortName(LIST.REGISTERED);
              close();
            }}
          >
            {LIST.REGISTERED}
          </ListItem>
          <ListItem
            className={sortName === LIST.PAYMENT ? "active" : ""}
            onClick={async () => {
              setSortName(LIST.PAYMENT);
              close();
            }}
          >
            {LIST.PAYMENT}
          </ListItem>
          <ListItem
            className={sortName === LIST.DATE ? "active" : ""}
            onClick={async () => {
              setSortName(LIST.DATE);
              close();
            }}
          >
            {LIST.DATE}
          </ListItem>
          <ListItem
            className={sortName === LIST.CHARGE ? "active" : ""}
            onClick={async () => {
              setSortName(LIST.CHARGE);
              close();
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
