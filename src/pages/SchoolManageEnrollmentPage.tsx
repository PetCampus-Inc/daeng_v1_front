import Header from "components/common/Header";
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon";
import ListIcon from "assets/svg/list-icon";
import MACarousel from "components/Admin/SchoolManage/MACarousel";
import { useNavigate } from "react-router-dom";
import { Background, PageContainer } from "styles/StyleModule";
import OwnerWaitingList from "components/Admin/SchoolManage/OwnerWaitingList";
import { ThemeConfig } from "styles/ThemeConfig";

const SchoolManageEnrollmentPage = () => {
  const navigate = useNavigate();
  return (
    <Background color={ThemeConfig.colors.gray_5}>
      <Header type="text" text="신규가입" handleClick={() => navigate("/admin/schoolManage")} />
      <PageContainer>
        <TitleWithIcon
          title="등록된 가입신청서"
          icon={<ListIcon />}
          handleClick={() => navigate("list")}
        />
        <MACarousel />
        <OwnerWaitingList />
      </PageContainer>
    </Background>
  );
};

export default SchoolManageEnrollmentPage;
