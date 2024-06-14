import AttendanceMain from "components/Admin/Attendance/AttendanceMain";
import AttendanceManagement from "components/Admin/Attendance/AttendanceManagement";
import AttendanceTop from "components/Admin/Attendance/AttendanceTop";
import { AttendanceProvider } from "components/Admin/Attendance/context/AttendanceProvider";
import Header from "components/common/Header";
import Navbar from "components/common/NavBar";
import { useSearchParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const AttendancePage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  return (
    <>
      <Header type="notice" text="출석부" />
      <PageContainer color="BGray" pt="2">
        <AttendanceProvider>
          <AttendanceTop />
          {mode !== "attend" ? <AttendanceMain /> : <AttendanceManagement />}
        </AttendanceProvider>
      </PageContainer>
      <Navbar />
    </>
  );
};

export default AttendancePage;
