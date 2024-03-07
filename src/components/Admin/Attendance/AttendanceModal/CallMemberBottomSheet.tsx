import BasicPhoneIcon from "assets/svg/phone-basic";
import BottomSheet from "components/common/BottomSheet";
import { memo } from "react";

import type { IMemberCallInfo } from "types/Attendance.type";

interface CallMemberBottomSheetProps {
  info: IMemberCallInfo | null;
  isOpen: boolean;
  close: () => void;
}

const CallMemberBottomSheet = memo(({ info, isOpen, close }: CallMemberBottomSheetProps) => {
  if (!isOpen) return null;
  if (!info) return null;

  const handleCallMember = (info: IMemberCallInfo) => {
    console.log(info.phoneNumber);
    // TODO: 해당 견주의 전화번호가 입력된 전화앱으로 바로 이동.
    close();
  };
  return (
    <BottomSheet isOpen={isOpen} onClose={() => close()}>
      <BottomSheet.Content>
        <BottomSheet.Control />
        <BottomSheet.Title>
          <BasicPhoneIcon />
          <span>{info?.dogName} 견주</span>
        </BottomSheet.Title>
        <BottomSheet.Subtitle>{info?.phoneNumber}</BottomSheet.Subtitle>
        <BottomSheet.Button actionText="전화 걸기" actionFn={() => handleCallMember(info)} />
      </BottomSheet.Content>
    </BottomSheet>
  );
});

export default CallMemberBottomSheet;
