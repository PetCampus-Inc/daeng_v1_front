import CallBottomSheet from "components/common/BottomSheet/CallBottomSheet";
import { useCallMember } from "hooks/api/admin/attendance";

import type { BottomSheetProps } from "components/common/BottomSheet";
import type { IMemberCallInfo } from "types/admin/attendance.type";

interface CallMemberBottomSheetProps extends BottomSheetProps {
  dogId: number;
}

export function CallMemberBottomSheet({ dogId, isOpen, close }: CallMemberBottomSheetProps) {
  const { data } = useCallMember(dogId);

  const handleCallMember = (data: IMemberCallInfo) => {
    console.log(data.phoneNumber);
    // TODO: 해당 견주의 전화번호가 입력된 전화앱으로 바로 이동.
    close();
  };

  return (
    <CallBottomSheet
      isOpen={isOpen}
      dogName={data.dogName}
      phoneNumber={data.phoneNumber}
      close={close}
      handleCall={() => handleCallMember(data)}
    />
  );
}
