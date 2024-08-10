import AttendanceMain from "components/Admin/Attendance/AttendanceMain";
import AttendanceManagement from "components/Admin/Attendance/AttendanceManagement";
import AttendanceTop from "components/Admin/Attendance/AttendanceTop";
import { AttendanceProvider } from "components/Admin/Attendance/context/AttendanceProvider";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { AdminNavBar } from "components/common/NavBar";
import { useSearchParams } from "react-router-dom";

const AttendancePage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  return (
    <>
      <Header type="notice" text="출석부" />
      <Layout type="main" bgColor="BGray" pt={32} px={16}>
        <AttendanceProvider>
          <AttendanceTop />
          {mode !== "attend" ? <AttendanceMain /> : <AttendanceManagement />}
        </AttendanceProvider>
      </Layout>
      <AdminNavBar />
    </>
  );
};

export default AttendancePage;
