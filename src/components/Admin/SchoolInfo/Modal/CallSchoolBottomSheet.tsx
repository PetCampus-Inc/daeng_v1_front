import { BottomSheetProps } from "components/common/BottomSheet";
import CallBottomSheet from "components/common/BottomSheet/CallBottomSheet";
import { memo } from "react";

import type { ISchoolCallInfo } from "types/admin/mypage.types";

interface CallSchoolBottomSheetProps extends BottomSheetProps {
  info: ISchoolCallInfo | null;
}

const CallSchoolBottomSheet = memo(({ info, ...bottomSheetProps }: CallSchoolBottomSheetProps) => {
  if (!info || info.schoolName === undefined || info.schoolNumber === undefined) return null;

  return (
    <CallBottomSheet
      schoolName={info.schoolName}
      phoneNumber={info.schoolNumber}
      {...bottomSheetProps}
    />
  );
});

export default CallSchoolBottomSheet;
