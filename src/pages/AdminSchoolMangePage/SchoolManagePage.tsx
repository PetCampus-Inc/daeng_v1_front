import MenuCard from "components/Admin/SchoolManage/MenuCard";
import Header from "components/common/Header";
import { AdminNavBar } from "components/common/NavBar";

const SchoolManagePage = () => {
  return (
    <>
      <Header type="notice" text="유치원 운영" />
      <MenuCard />
      <AdminNavBar />
    </>
  );
};

export default SchoolManagePage;
