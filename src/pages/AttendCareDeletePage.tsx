import AttendCareDelete from "components/Admin/AttendCare/AttendCareDelete";
import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import { PageContainer } from "styles/StyleModule";

const AttendCareDeletePage = () => {
  return (
    <>
      <Header type="text" text="관리 강아지 삭제" />
      <PageContainer $padding="32px 0 78px">
        <AttendCareDelete />
      </PageContainer>
      <NavBar />
    </>
  );
};

export default AttendCareDeletePage;
