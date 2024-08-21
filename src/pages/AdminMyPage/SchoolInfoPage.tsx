import SchoolInfo from "components/Admin/SchoolInfo";
import { Layout } from "components/common";
import Header from "components/common/Header";

const SchoolInfoPage = () => {
  return (
    <>
      <Header type="text" text="유치원 상세정보" />
      <Layout type="detail" backgroundColor="gray_5" paddingTop="1.5rem" paddingX="1rem">
        <SchoolInfo />
      </Layout>
    </>
  );
};

export default SchoolInfoPage;
