import AttendanceMain from "components/Admin/Attendance/AttendanceMain";
import Attendance from "components/Admin/Attendance/AttendanceMode";
import AttendanceTop from "components/Admin/Attendance/AttendanceTop";
import { AttendanceProvider } from "components/Admin/Attendance/context/AttendanceProvider";
import Header from "components/common/Header";
import Navbar from "components/common/NavBar";
import { useState } from "react";
import { PageContainer } from "styles/StyleModule";

const AttendancePage = () => {
  const [mode, setMode] = useState<"DEFAULT" | "ATTENDANCE">("DEFAULT");

  const isAttendMode = mode === "ATTENDANCE";
  const isDefaultMode = mode === "DEFAULT";

  return (
    <>
      <Header type="notice" text="출석부" />
      <PageContainer color="BGray" pt="2">
        <AttendanceProvider>
          <AttendanceTop mode={mode} setMode={setMode} />
          {isDefaultMode && <AttendanceMain />}
          {isAttendMode && <Attendance setMode={setMode} />}
        </AttendanceProvider>
      </PageContainer>
      <Navbar type="admin" />
    </>
  );
};

export default AttendancePage;
