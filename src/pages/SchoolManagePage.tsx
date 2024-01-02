import Header from "components/common/Header";
import NavBar from "components/common/NavBar";

const SchoolManagePage = () => {
  return (
    <>
      <Header type="main" />
      <NavBar type="admin" attendance={"/admin/dogInfo"} />
    </>
  );
};

export default SchoolManagePage;
