import { Layout } from "components/common";
import Header from "components/common/Header";
import SchoolInfo from "components/Member/SchoolInfo";
import PreviousSchoolInfo from "components/Member/SchoolInfo/PreviousSchoolInfo";
import { useGetMemberSchoolInfo } from "hooks/api/member/member";
import { useParams } from "react-router-dom";

const MemberSchoolInfoPage = () => {
  const { dogId } = useParams();
  const { data } = useGetMemberSchoolInfo(String(dogId));

  return (
    <>
      <Header type="text" text="유치원 상세정보" />
      <Layout pt="calc(5vh + 2rem)" px="1rem" bg="gray_5">
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
      </Layout>
    </>
  );
};

export default MemberSchoolInfoPage;
