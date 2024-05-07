import Header from "components/common/Header";
import SchoolInfo from "components/Member/SchoolInfo";
import PreviousSchoolInfo from "components/Member/SchoolInfo/PreviousSchoolInfo";
import { useGetMemberSchoolInfo } from "hooks/api/member/member";
import { useParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const MemberSchoolInfoPage = () => {
  const { dogId } = useParams();
  const { data } = useGetMemberSchoolInfo(Number(dogId));

  return (
    <>
      <Header type="text" text="유치원 상세정보" />
      <PageContainer pt="2" color="gray_5">
        <SchoolInfo data={data} />
        <PreviousSchoolInfo data={data} />
      </PageContainer>
    </>
  );
};

export default MemberSchoolInfoPage;
