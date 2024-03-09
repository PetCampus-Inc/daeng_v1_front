import { LIST } from "constants/option";

import ArrowDownIcon from "assets/svg/arrow-down-icon";
import BottomSheet from "components/common/BottomSheet";
import useBottomSheet from "hooks/common/useBottomSheet";
import { memo, type SetStateAction } from "react";
import { ConfirmButton } from "styles/StyleModule";

import * as S from "./styles";

type SortSelectBoxProps = {
  sortName: string;
  setSortName: React.Dispatch<SetStateAction<string>>;
};

const SortSelectBox = memo(({ sortName, setSortName }: SortSelectBoxProps) => {
  const { isVisible, open, close } = useBottomSheet(false);

  return (
    <>
      <BottomSheet isOpen={isVisible} onClose={close}>
        <BottomSheet.Content>
          <BottomSheet.Title variant="body">정렬</BottomSheet.Title>
          <S.ListWrapper>
            <S.ListItem
              className={sortName === LIST.REGISTERED ? "active" : ""}
              onClick={async () => {
                setSortName(LIST.REGISTERED);
              }}
            >
              {LIST.REGISTERED}
            </S.ListItem>
            <S.ListItem
              className={sortName === LIST.PAYMENT ? "active" : ""}
              onClick={async () => {
                setSortName(LIST.PAYMENT);
              }}
            >
              {LIST.PAYMENT}
            </S.ListItem>
            <S.ListItem
              className={sortName === LIST.DATE ? "active" : ""}
              onClick={async () => {
                setSortName(LIST.DATE);
              }}
            >
              {LIST.DATE}
            </S.ListItem>
            <S.ListItem
              className={sortName === LIST.CHARGE ? "active" : ""}
              onClick={async () => {
                setSortName(LIST.CHARGE);
              }}
            >
              {LIST.CHARGE}
            </S.ListItem>
          </S.ListWrapper>
          <ConfirmButton onClick={() => close()}>닫기</ConfirmButton>
        </BottomSheet.Content>
      </BottomSheet>
      <S.SelectBox
        onClick={(event) => {
          event.stopPropagation();
          open();
        }}
      >
        <S.Text>{sortName}</S.Text>
        <S.ArrowDownButton type="button">
          <ArrowDownIcon />
        </S.ArrowDownButton>
      </S.SelectBox>
    </>
  );
});

export default SortSelectBox;
