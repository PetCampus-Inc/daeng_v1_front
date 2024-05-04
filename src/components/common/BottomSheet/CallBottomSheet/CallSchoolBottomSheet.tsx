import { memo } from "react";

import CallBottomSheet from "./index";

import type { ISchoolCallInfo } from "types/admin/mypage.type";

interface CallSchoolBottomSheetProps {
  info: ISchoolCallInfo | null;
  isOpen: boolean;
  close: () => void;
}

const CallSchoolBottomSheet = memo(({ info, isOpen, close }: CallSchoolBottomSheetProps) => {
  if (!(info?.schoolName && info?.schoolNumber)) return null;

  const handleCallMember = (info: ISchoolCallInfo) => {
    console.log(info.schoolNumber);
    // TODO: 해당 유치원 전화번호가 입력된 전화앱으로 바로 이동.
    close();
  };

  return (
    <CallBottomSheet
      isOpen={isOpen}
      schoolName={info.schoolName}
      phoneNumber={info.schoolNumber}
      close={close}
      handleCall={() => handleCallMember(info)}
    />
  );
});

export default CallSchoolBottomSheet;
