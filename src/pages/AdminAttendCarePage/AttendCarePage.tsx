import AttendCareInit from "components/Admin/AttendCare/AttendCareInit";
import AttendCareMain from "components/Admin/AttendCare/AttendCareMain";
import AttendCareEmpty from "components/Admin/AttendCare/AttendCareMain/AttendCareEmpty";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { AdminNavBar } from "components/common/NavBar";
import { useGetCareDogList } from "hooks/api/admin/care";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useRouteLoaderData } from "react-router-dom";
import caredogLoader from "routes/caredogLoader";

const AttendCarePage = () => {
  const { adminId } = useAdminInfo();
  const initialData = useRouteLoaderData("caredog") as Awaited<ReturnType<typeof caredogLoader>>;

  const { data } = useGetCareDogList(adminId, initialData);

  const isFirstVisit = data.some((dog) => dog.adminName === null);
  const isEmptyDog = data.length === 0;

  return (
    <>
      <Header type="notice" text="강아지 관리" />
      <Layout type="main" bgColor={isFirstVisit ? "white" : "BGray"} pt={32} px={16}>
        {isFirstVisit ? (
          <AttendCareInit />
        ) : isEmptyDog ? (
          <AttendCareEmpty />
        ) : (
          <AttendCareMain data={data} />
        )}
      </Layout>
      <AdminNavBar />
    </>
  );
};

export default AttendCarePage;
