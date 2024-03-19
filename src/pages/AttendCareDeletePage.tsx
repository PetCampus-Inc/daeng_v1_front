import AttendCareDelete from "components/Admin/AttendCare/AttendCareDelete";
import Header from "components/common/Header";
import { useGetCareDogList } from "hooks/api/caredogQuery";
import { useRouteLoaderData } from "react-router-dom";
import { useRecoilValue } from "recoil";
import caredogLoader from "routes/caredogLoader";
import { adminLoginInfoAtom } from "store/admin";
import { PageContainer } from "styles/StyleModule";

const AttendCareDeletePage = () => {
  const { adminId } = useRecoilValue(adminLoginInfoAtom);
  const initialData = useRouteLoaderData("caredog") as Awaited<ReturnType<typeof caredogLoader>>;
  const { data } = useGetCareDogList(adminId, initialData);
  return (
    <>
      <Header type="text" text="관리 강아지 삭제" />
      <PageContainer color="BGray" pt="2">
        <AttendCareDelete data={data} />
      </PageContainer>
    </>
  );
};

export default AttendCareDeletePage;
