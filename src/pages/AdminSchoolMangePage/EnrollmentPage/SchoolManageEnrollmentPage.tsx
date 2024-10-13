import { routes } from "constants/path";

import ListIcon from "assets/svg/list-icon";
import { MemberWaitingList, SchoolFormSlide } from "components/Admin/SchoolManage/Enrollment";
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { useNavigate } from "react-router-dom";

const SchoolManageEnrollmentPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header type="text" text="신규가입" handleClick={() => navigate(routes.admin.school.root)} />
      <Layout pt={32} px={16} bgColor="gray_5">
        <TitleWithIcon
          title="등록된 가입신청서"
          icon={<ListIcon />}
          handleClick={() => navigate(routes.admin.school.enrollment.ownerForms.root)}
        />
        <SchoolFormSlide />
        <MemberWaitingList />
      </Layout>
    </>
  );
};

export default SchoolManageEnrollmentPage;
