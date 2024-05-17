import EnrollmentDogDetail from "components/Member/DogInfo/Enrollment/EnrollmentDogDetail";
import { PageContainer } from "styles/StyleModule";

const MemberEnrollmentDogInfoPage = () => {
  const dogId = 1;

  return (
    <PageContainer ph="0">
      <EnrollmentDogDetail dogId={dogId} />
    </PageContainer>
  );
};

export default MemberEnrollmentDogInfoPage;
