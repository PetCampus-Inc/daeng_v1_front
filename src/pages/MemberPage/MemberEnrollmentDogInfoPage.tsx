import Header from "components/common/Header";
import EnrollmentDogDetail from "components/Member/DogInfo/Enrollment/EnrollmentDogDetail";
import { PageContainer } from "styles/StyleModule";

const MemberEnrollmentDogInfoPage = () => {
  const dogId = 1;

  return (
    <>
      <Header type="text" text="뽀뽀의 가입신청서" />
      <PageContainer ph="0">
        <EnrollmentDogDetail dogId={dogId} />
      </PageContainer>
    </>
  );
};

export default MemberEnrollmentDogInfoPage;
