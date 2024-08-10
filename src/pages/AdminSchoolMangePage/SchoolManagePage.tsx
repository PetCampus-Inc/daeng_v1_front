import MenuCard from "components/Admin/SchoolManage/MenuCard";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { AdminNavBar } from "components/common/NavBar";

const SchoolManagePage = () => {
  return (
    <>
      <Header type="notice" text="유치원 운영" />
      <Layout type="main" bgColor="white" pt={32} px={16}>
        <MenuCard />
      </Layout>
      <AdminNavBar />
    </>
  );
};

export default SchoolManagePage;
