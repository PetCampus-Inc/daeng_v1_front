import Header from "components/common/Header";
import EnrollmentDogDetail from "components/Member/DogInfo/Enrollment/EnrollmentDogDetail";
import EnrollmentPage from "pages/SignUpPage/EnrollmentPage";
import { useLocation } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const MemberEnrollmentDogInfoPage = () => {
  const isDoginfo = useLocation()
    .pathname.split("/")
    .some((url) => url === "dogInfo");

  return (
    <>
      <Header type="text" text="뽀뽀의 가입신청서" />
      <PageContainer pt="1">
        {/* <EnrollmentDogDetail /> */}
        <EnrollmentPage isMemberAddDog={true} />
      </PageContainer>
    </>
  );
};

export default MemberEnrollmentDogInfoPage;
