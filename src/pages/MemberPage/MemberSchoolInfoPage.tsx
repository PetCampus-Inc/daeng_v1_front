import { Layout } from "components/common";
import Header from "components/common/Header";
import { Text } from "components/common/Text";
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
      <Layout pt="1.5rem" px="1rem" bg="gray_5">
        <SchoolInfo />

        {data.pastDogSchoolList.length > 0 && (
          <>
            <Text color="darkBlack" typo="body2_16_B" as="p">
              이전 유치원 내역
            </Text>
            {data.pastDogSchoolList.map((item, idx) => (
              <PreviousSchoolInfo
                key={idx}
                schoolName={item.schoolName}
                schoolNumber={item.schoolNumber}
                schoolAddress={item.schoolAddress ?? ""}
                dropOutDate={item.dropOutDate ?? ""}
              />
            ))}
          </>
        )}
      </Layout>
    </>
  );
};

export default MemberSchoolInfoPage;
