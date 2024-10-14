import { BottomSheetProps } from "components/common/BottomSheet/BottomSheet";
import { memo } from "react";

import CallBottomSheet from "./index";

import type { ISchoolCallInfo } from "types/admin/mypage.types";

interface CallSchoolBottomSheetProps extends BottomSheetProps {
  info: ISchoolCallInfo | null;
}

const CallSchoolBottomSheet = memo(({ info, ...bottomSheetProps }: CallSchoolBottomSheetProps) => {
  if (!(info?.schoolName && info?.schoolNumber)) return null;

  return (
    <CallBottomSheet
      schoolName={info.schoolName}
      phoneNumber={info.schoolNumber}
      {...bottomSheetProps}
    />
  );
});

export default CallSchoolBottomSheet;
