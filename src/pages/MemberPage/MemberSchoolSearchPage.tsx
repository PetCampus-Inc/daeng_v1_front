import { PATH } from "constants/path";

import Header from "components/common/Header";
import { useParams, useNavigate } from "react-router-dom";
import { MemberRole } from "types/common/role.types";

import SearchSchoolPage from "../SignUpPage/SearchSchoolPage";

const MemberSchoolSearchPage = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const handleGotoPage = () => {
    navigate(PATH.MEMBER_MY_ENROLLMENT(String(memberId)));
  };
  return (
    <>
      <Header type="back" />
      <SearchSchoolPage type={MemberRole.ROLE_MEMBER} onNextStep={handleGotoPage} />
    </>
  );
};

export default MemberSchoolSearchPage;
