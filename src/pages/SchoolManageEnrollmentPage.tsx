import ListIcon from "assets/svg/list-icon";
import MACarousel from "components/Admin/SchoolManage/MACarousel";
import OwnerWaitingList from "components/Admin/SchoolManage/OwnerWaitingList";
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon";
import Header from "components/common/Header";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const SchoolManageEnrollmentPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header type="text" text="신규가입" />
      <PageContainer pt="2" color="gray_5">
        <TitleWithIcon
          title="등록된 가입신청서"
          icon={<ListIcon />}
          handleClick={() => navigate("list")}
        />
        <MACarousel />
        <OwnerWaitingList />
      </PageContainer>
    </>
  );
};

export default SchoolManageEnrollmentPage;
