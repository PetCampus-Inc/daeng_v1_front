import BottomSheet from "components/common/BottomSheet";
import type { IMemberCallInfo } from "types/Attendance.type";
import XIcon from "assets/svg/x-icon";
import BasicPhoneIcon from "assets/svg/phone-basic";
import { Container, SubTitle, Title, TitleWrapper } from "./styles";
import { CloseButton, ConfirmButton } from "styles/StyleModule";

interface CallMemberBottomSheetProps {
  info: IMemberCallInfo | null;
  close: () => void;
}

const CallMemberBottomSheet = ({ info, close }: CallMemberBottomSheetProps) => {
  if (!info) return;

  const handleCallMember = (info: IMemberCallInfo) => {
    console.log(info.phoneNumber);
    // TODO: 해당 견주의 전화번호가 입력된 전화앱으로 바로 이동.
    close();
  };
  return (
    <BottomSheet onClose={() => close()}>
      <CloseButton type="button" onClick={() => close()}>
        <XIcon />
      </CloseButton>
      <Container>
        <TitleWrapper>
          <BasicPhoneIcon />
          <Title>{info.dogName} 견주</Title>
        </TitleWrapper>
        <SubTitle>{info.phoneNumber}</SubTitle>
      </Container>
      <ConfirmButton onClick={() => handleCallMember(info)}>전화 걸기</ConfirmButton>
    </BottomSheet>
  );
};

export default CallMemberBottomSheet;
