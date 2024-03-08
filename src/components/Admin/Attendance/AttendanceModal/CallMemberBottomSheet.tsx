import CallBottomSheet from "components/common/BottomSheet/CallBottomSheet";
import { memo } from "react";

import type { IMemberCallInfo } from "types/Attendance.type";

interface CallMemberBottomSheetProps {
  info: IMemberCallInfo | null;
  isOpen: boolean;
  close: () => void;
}

const CallMemberBottomSheet = memo(({ info, isOpen, close }: CallMemberBottomSheetProps) => {
  if (!info) return null;

  const handleCallMember = (info: IMemberCallInfo) => {
    console.log(info.phoneNumber);
    // TODO: 해당 견주의 전화번호가 입력된 전화앱으로 바로 이동.
    close();
  };

  return (
    <CallBottomSheet
      isOpen={isOpen}
      dogName={info.dogName}
      phoneNumber={info.phoneNumber}
      onClose={close}
      handleCall={() => handleCallMember(info)}
    />
  );
});

export default CallMemberBottomSheet;
