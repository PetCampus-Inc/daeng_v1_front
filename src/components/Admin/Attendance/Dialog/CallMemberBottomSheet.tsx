import CallBottomSheet from "components/common/BottomSheet/CallBottomSheet";
import { useCallMember } from "hooks/api/admin/attendance";

import type { BottomSheetProps } from "components/common/BottomSheet";

interface CallMemberBottomSheetProps extends BottomSheetProps {
  dogId: number;
}

export function CallMemberBottomSheet({ dogId, ...bottomSheetProps }: CallMemberBottomSheetProps) {
  const { data } = useCallMember(dogId);

  return (
    <CallBottomSheet dogName={data.dogName} phoneNumber={data.phoneNumber} {...bottomSheetProps} />
  );
}
