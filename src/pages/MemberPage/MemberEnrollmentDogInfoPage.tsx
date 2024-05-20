import EnrollmentDogDetail from "components/Member/DogInfo/Enrollment/EnrollmentDogDetail";
import { useParams } from "react-router-dom";

const MemberEnrollmentDogInfoPage = () => {
  const { dogId } = useParams();

  return <EnrollmentDogDetail dogId={Number(dogId)} />;
};

export default MemberEnrollmentDogInfoPage;
