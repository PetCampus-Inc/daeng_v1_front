import SchoolInfo from "components/Admin/MyPage/SchoolInfo";
import Header from "components/common/Header";
import { PageContainer } from "styles/StyleModule";

const SchoolInfoPage = () => {
  return (
    <>
      <Header type="text" text="유치원 상세 정보" />
      <PageContainer pt="2" color="gray_5">
        <SchoolInfo />
      </PageContainer>
    </>
  );
};

export default SchoolInfoPage;
