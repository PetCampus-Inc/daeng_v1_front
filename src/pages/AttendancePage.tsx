import { useState } from "react";
import Navbar from "components/common/NavBar";
import Header from "components/common/Header";
import AttendanceTop from "components/Admin/Attendance/AttendanceTop";
import AttendanceSearch from "components/Admin/Attendance/AttendanceSearch";
import { PageContainer } from "styles/StyleModule";
import { adminLoginInfoAtom } from "store/admin";
import { useRecoilValue } from "recoil";
import AttendanceMain from "components/Admin/Attendance/AttendanceMain";

const AttendancePage = () => {
  const { schoolId, adminId } = useRecoilValue(adminLoginInfoAtom).data;
  const [mode, setMode] = useState<"DEFAULT" | "ATTENDANCE">("DEFAULT");
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const isAttendMode = mode === "ATTENDANCE";
  const isDefaultMode = mode === "DEFAULT";

  return (
    <>
      <Header type="notice" text="출석부" />
      <PageContainer $paddingTop="32px" style={{ paddingBottom: "78px" }}>
        <AttendanceTop mode={mode} setMode={setMode} isFocus={isFocus} />
        {isDefaultMode && (
          <AttendanceMain
            schoolId={schoolId}
            adminId={adminId}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
          />
        )}
        {isAttendMode && (
          <AttendanceSearch
            schoolId={schoolId}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            setMode={setMode}
          />
        )}
      </PageContainer>
      <Navbar type="admin" />
    </>
  );
};

export default AttendancePage;
