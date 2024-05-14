import Header from "components/common/Header";
import SchoolInfo from "components/Member/SchoolInfo";
import PreviousSchoolInfo from "components/Member/SchoolInfo/PreviousSchoolInfo";
import { useGetMemberSchoolInfo } from "hooks/api/member/member";
import { useParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const MemberSchoolInfoPage = () => {
  const { dogId } = useParams();
  const { data } = useGetMemberSchoolInfo(String(dogId));

  return (
    <>
      <Header type="text" text="유치원 상세정보" />
      <PageContainer pt="2" color="gray_5">
        <SchoolInfo data={data} />
        {data.pastDogSchoolList &&
          data.pastDogSchoolList.map((item) => (
            <PreviousSchoolInfo
              key={item.schoolName}
              schoolName={item.schoolName}
              schoolNumber={item.schoolNumber}
              schoolAddress={item.schoolAddress}
              dropOutDate={item.dropOutDate}
            />
          ))}
      </PageContainer>
    </>
  );
};

export default MemberSchoolInfoPage;
