import Header from "components/common/Header";
import SchoolInfo from "components/Member/SchoolInfo";
import PreviousSchoolInfo from "components/Member/SchoolInfo/PreviousSchoolInfo";
import { PageContainer } from "styles/StyleModule";

const MemberSchoolInfoPage = () => {
  return (
    <>
      <Header type="text" text="유치원 상세정보" />
      <PageContainer pt="2" color="gray_5">
        <SchoolInfo />
        <PreviousSchoolInfo />
      </PageContainer>
    </>
  );
};

export default MemberSchoolInfoPage;