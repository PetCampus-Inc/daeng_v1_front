import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import { PATH } from "constants/path";

const SchoolManagePage = () => {
  return (
    <>
      <Header type="main" />
      <NavBar type="admin" attendance={PATH.ADMIN_DOG_INFO} />
    </>
  );
};

export default SchoolManagePage;
