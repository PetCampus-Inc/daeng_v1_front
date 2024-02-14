import EnrollmentForm from "components/Admin/EnrollmentForm";
import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import { PATH } from "constants/path";

const EnrollmentFormEditPage = () => {
  return (
    <>
      <Header type="main" />
      <EnrollmentForm type="EDIT" />
      <NavBar type="admin" attendance={PATH.ADMIN_DOG_INFO} />
    </>
  );
};

export default EnrollmentFormEditPage;
