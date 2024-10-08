import useNativeAction from "hooks/native/useNativeAction";
import { memo } from "react";

import CallBottomSheet from "./index";

import type { ISchoolCallInfo } from "types/admin/mypage.types";

interface CallSchoolBottomSheetProps {
  info: ISchoolCallInfo | null;
  isOpen: boolean;
  close: () => void;
}

const CallSchoolBottomSheet = memo(({ info, isOpen, close }: CallSchoolBottomSheetProps) => {
  const { call } = useNativeAction();

  if (!(info?.schoolName && info?.schoolNumber)) return null;

  const handleCallMember = () => {
    if (info.schoolNumber) call(info.schoolNumber);
    close();
  };

  return (
    <CallBottomSheet
      isOpen={isOpen}
      schoolName={info.schoolName}
      phoneNumber={info.schoolNumber}
      close={close}
      handleCall={handleCallMember}
    />
  );
});

export default CallSchoolBottomSheet;
