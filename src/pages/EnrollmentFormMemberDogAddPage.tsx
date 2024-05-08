import Header from "components/common/Header";
import EnrollmentForm from "components/Enrollment";

const EnrollmentFormMemberDogAddPage = () => {
  return (
    <>
      <Header type="text" text="가입신청서" />
      <EnrollmentForm isMemberAddDog />
    </>
  );
};

export default EnrollmentFormMemberDogAddPage;
