import AttendCareInit from "components/Admin/AttendCare/AttendCareInit";
import AttendCareMain from "components/Admin/AttendCare/AttendCareMain";
import AttendCareEmpty from "components/Admin/AttendCare/AttendCareMain/AttendCareEmpty";
import Header from "components/common/Header";
import { AdminNavBar } from "components/common/NavBar";
import { useGetCareDogList } from "hooks/api/admin/care";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useRouteLoaderData } from "react-router-dom";
import caredogLoader from "routes/caredogLoader";
import { PageContainer } from "styles/StyleModule";

const AttendCarePage = () => {
  const { adminId } = useAdminInfo();
  const initialData = useRouteLoaderData("caredog") as Awaited<ReturnType<typeof caredogLoader>>;

  const { data } = useGetCareDogList(adminId, initialData);

  const isFirstVisit = data.some((dog) => dog.adminName === null);
  const isEmptyDog = data.length === 0;

  return (
    <>
      <Header type="notice" text="강아지 관리" />
      <PageContainer color={isFirstVisit ? "white" : "BGray"} pt="2">
        {isFirstVisit ? (
          <AttendCareInit />
        ) : isEmptyDog ? (
          <AttendCareEmpty />
        ) : (
          <AttendCareMain data={data} />
        )}
      </PageContainer>
      <AdminNavBar />
    </>
  );
};

export default AttendCarePage;
