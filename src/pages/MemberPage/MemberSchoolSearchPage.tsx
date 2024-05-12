import { PATH } from "constants/path";

import Header from "components/common/Header";
import { useParams, useNavigate } from "react-router-dom";

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
      <SearchSchoolPage type="MEMBER" onNextStep={handleGotoPage} />
    </>
  );
};

export default MemberSchoolSearchPage;
