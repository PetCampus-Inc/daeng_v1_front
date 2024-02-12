import EnrollmentForm from "components/Admin/EnrollmentForm";
import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import { PATH } from "constants/path";

const EnrollmentFormCreatePage = () => {
  return (
    <>
      <Header type="main" />
      <EnrollmentForm type="CREATE" />
      <NavBar type="admin" attendance={PATH.ADMIN_DOG_INFO} />
    </>
  );
};

export default EnrollmentFormCreatePage;
