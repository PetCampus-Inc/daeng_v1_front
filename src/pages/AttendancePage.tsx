import Attendance from "components/Admin/Attendance";
import Navbar from "components/common/NavBar";
import Header from "components/common/Header";

const AttendancePage = () => {
  return (
    <>
      <Header type="main" />
      <Attendance />
      <Navbar />
    </>
  );
};

export default AttendancePage;
