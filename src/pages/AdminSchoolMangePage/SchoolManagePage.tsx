import MenuCard from "components/Admin/SchoolManage/MenuCard";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { AdminNavBar } from "components/common/NavBar";
import { useGetNewAlarm } from "hooks/api/admin/alarm";

const SchoolManagePage = () => {
  //FIXME 어드민 아이디 수정
  const adminId = 1;
  const { data: alarm } = useGetNewAlarm(adminId);

  return (
    <>
      <Header type="notice" text="유치원 운영" isNewAlarm={alarm.newAlarm} />
      <Layout type="main" bgColor="white" pt={32} px={16}>
        <MenuCard />
      </Layout>
      <AdminNavBar />
    </>
  );
};

export default SchoolManagePage;
