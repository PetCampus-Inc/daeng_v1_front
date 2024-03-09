import AttendCare from "components/Admin/AttendCare";
import AttendCareInit from "components/Admin/AttendCare/AttendCareInit";
import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import { PageContainer } from "styles/StyleModule";

type AttendCarePageProps = { type: "main" | "init" };

const AttendCarePage = ({ type }: AttendCarePageProps) => {
  const isFirstEntry = type === "init";

  return (
    <>
      <Header type="notice" text="강아지 관리" />
      <PageContainer $padding="32px 0 78px">
        {isFirstEntry ? <AttendCareInit /> : <AttendCare />}
      </PageContainer>
      <NavBar />
    </>
  );
};

export default AttendCarePage;
