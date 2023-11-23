import Attendance from "components/Admin/Attendance";
import Navbar from "components/common/NavBar";
import Header from "components/common/Header";
import { useState } from "react";

const AttendancePage = () => {
  const [isNavHidden, setIsNavHidden] = useState(false);
  return (
    <>
      <Header type="main" />
      <Attendance setIsNavHidden={setIsNavHidden} />
      <Navbar type="admin" show={isNavHidden ? "none" : "flex"} />
    </>
  );
};

export default AttendancePage;
