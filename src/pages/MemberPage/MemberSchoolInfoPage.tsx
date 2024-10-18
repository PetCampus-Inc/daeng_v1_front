import { Layout } from "components/common";
import Header from "components/common/Header";
import { Text } from "components/common/Text";
import SchoolInfo from "components/Member/SchoolInfo";
import PreviousSchoolInfo from "components/Member/SchoolInfo/PreviousSchoolInfo";
import * as S from "components/Member/SchoolInfo/styles";
import { useGetMemberSchoolInfo } from "hooks/api/member/member";
import { useParams } from "react-router-dom";

const MemberSchoolInfoPage = () => {
  const { dogId } = useParams();
  const { data } = useGetMemberSchoolInfo(String(dogId));

  return (
    <>
      <Header type="text" text="유치원 상세정보" />
      <Layout pt="1.5rem" px="1rem" pb="2rem" bg="gray_5">
        <SchoolInfo dogId={String(dogId)} />

        {data.pastDogSchoolList.length > 0 && (
          <>
            <Text color="darkBlack" typo="body2_16_B" as="p">
              이전 유치원 내역
            </Text>
            <S.CardContainer className="previous">
              {data.pastDogSchoolList.map((school, idx) => (
                <PreviousSchoolInfo
                  key={idx}
                  schoolName={school.schoolName}
                  schoolNumber={school.schoolNumber}
                  schoolAddress={school.schoolAddress}
                  schoolAddressDetail={school.schoolAddressDetail}
                  dropOutDate={school.dropOutDate}
                />
              ))}
            </S.CardContainer>
          </>
        )}
      </Layout>
    </>
  );
};

export default MemberSchoolInfoPage;
