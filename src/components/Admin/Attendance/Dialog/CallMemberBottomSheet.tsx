import CallBottomSheet from "components/common/BottomSheet/CallBottomSheet";
import { useCallMember } from "hooks/api/admin/attendance";
import useNativeAction from "hooks/native/useNativeAction";

import type { BottomSheetProps } from "components/common/BottomSheet";

interface CallMemberBottomSheetProps extends BottomSheetProps {
  dogId: number;
}

export function CallMemberBottomSheet({ dogId, isOpen, close }: CallMemberBottomSheetProps) {
  const { data } = useCallMember(dogId);
  const { call } = useNativeAction();

  const handleCallMember = () => {
    call(data.phoneNumber);
    close();
  };

  return (
    <CallBottomSheet
      isOpen={isOpen}
      dogName={data.dogName}
      phoneNumber={data.phoneNumber}
      close={close}
      handleCall={handleCallMember}
    />
  );
}
