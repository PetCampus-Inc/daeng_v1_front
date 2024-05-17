import MapPinIcon from "assets/svg/map-pin-icon";
import { Text } from "components/common";
import BottomSheet, { IBottomSheetProps } from "components/common/BottomSheet";

import { ContentStyle, StyledBox } from "./styles";

interface Props extends IBottomSheetProps {
  action: () => void;
  address: string;
}

const AddressModifyBottomSheet = ({ isOpen, action, close, address }: Props) => {
  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content css={ContentStyle}>
        <BottomSheet.Title variant="body">선택된 주소를 수정하시겠습니까?</BottomSheet.Title>
        <BottomSheet.Subtitle>기존에 입력했던 주소가 초기화 돼요</BottomSheet.Subtitle>
        <StyledBox>
          <MapPinIcon />
          <Text typo="body2_16_R" color="darkBlack">
            {address}
          </Text>
        </StyledBox>
        <BottomSheet.Button
          actionText="수정"
          actionFn={() => {
            action();
            close();
          }}
          closeText="닫기"
          closeFn={close}
        />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default AddressModifyBottomSheet;
