import { PATH } from "constants/path";

import ListIcon from "assets/svg/list-icon";
import MACarousel from "components/Admin/SchoolManage/MACarousel";
import OwnerWaitingList from "components/Admin/SchoolManage/MemberWaitingList";
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { useNavigate } from "react-router-dom";

const SchoolManageEnrollmentPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header type="text" text="신규가입" handleClick={() => navigate(PATH.ADMIN_SCHOOL_MANAGE)} />
      <Layout pt={32} px={16} bgColor="gray_5">
        <TitleWithIcon
          title="등록된 가입신청서"
          icon={<ListIcon />}
          handleClick={() => navigate(PATH.ADMIN_FORMS)}
        />
        <MACarousel />
        <OwnerWaitingList />
      </Layout>
    </>
  );
};

export default SchoolManageEnrollmentPage;
