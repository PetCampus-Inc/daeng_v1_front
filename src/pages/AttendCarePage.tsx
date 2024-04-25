import AttendCareInit from "components/Admin/AttendCare/AttendCareInit";
import AttendCareMain from "components/Admin/AttendCare/AttendCareMain";
import AttendCareNoResult from "components/Admin/AttendCare/AttendCareNoResult";
import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import { useGetCareDogList } from "hooks/api/admin/care";
import { useRouteLoaderData } from "react-router-dom";
import { useRecoilValue } from "recoil";
import caredogLoader from "routes/caredogLoader";
import { adminLoginInfoAtom } from "store/admin";
import { PageContainer } from "styles/StyleModule";

const AttendCarePage = () => {
  const { adminId } = useRecoilValue(adminLoginInfoAtom);
  const initialData = useRouteLoaderData("caredog") as Awaited<ReturnType<typeof caredogLoader>>;

  const { data } = useGetCareDogList(adminId, initialData);

  // FIXME: 출석한 강아지가 없는 경우 [] 임.
  // FIXME: get 강아지관리 api 수정되면 []로 최초진입 구분하기!!
  const noCareDog = data.some((dog) => dog.adminName === null);
  const isFirstVisit = noCareDog;
  const hasNoCaredDog = data.length === 0;

  return (
    <>
      <Header type="notice" text="강아지 관리" />
      <PageContainer color={isFirstVisit ? "white" : "BGray"} pt="2">
        {isFirstVisit ? (
          <AttendCareInit />
        ) : hasNoCaredDog ? (
          <AttendCareNoResult />
        ) : (
          <AttendCareMain data={data} />
        )}
      </PageContainer>
      <NavBar />
    </>
  );
};

export default AttendCarePage;
