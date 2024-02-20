import MenuCard from "components/Admin/SchoolManage/MenuCard";
import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import { PATH } from "constants/path";

const SchoolManagePage = () => {
  return (
    <>
      <Header type="notice" text="유치원 운영" />
      <MenuCard />
      <NavBar type="admin" attendance={PATH.ADMIN_DOG_INFO} />
    </>
  );
};

export default SchoolManagePage;
