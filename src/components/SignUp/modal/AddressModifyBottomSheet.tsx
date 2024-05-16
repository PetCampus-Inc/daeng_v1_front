import MapPinIcon from "assets/svg/map-pin-icon";
import { Text } from "components/common";
import BottomSheet, { IBottomSheetProps } from "components/common/BottomSheet";

import { ContentStyle, StyledBox } from "./styles";

const AddressModifyBottomSheet = ({ isOpen, close }: IBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content css={ContentStyle}>
        <BottomSheet.Title variant="body">선택된 주소를 수정하시겠습니까?</BottomSheet.Title>
        <BottomSheet.Subtitle>기존에 입력했던 주소가 초기화 돼요</BottomSheet.Subtitle>
        <StyledBox>
          <MapPinIcon />
          <Text typo="body2_16_R" color="darkBlack">
            서울 중구 덕수궁길 향교로 12-2 (똑독 유치원)
          </Text>
        </StyledBox>
        <BottomSheet.Button
          actionText="수정"
          actionFn={() => console.log("적용")}
          closeText="닫기"
          closeFn={close}
        />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default AddressModifyBottomSheet;
