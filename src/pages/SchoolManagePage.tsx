import MenuCard from "components/Admin/SchoolManage/MenuCard";
import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import { PATH } from "constants/path";
import { Background } from "styles/StyleModule";

const SchoolManagePage = () => {
  return (
    <Background>
      <Header type="notice" text="유치원 운영" />
      <MenuCard />
      <NavBar type="admin" attendance={PATH.ADMIN_DOG_INFO} />
    </Background>
  );
};

export default SchoolManagePage;
