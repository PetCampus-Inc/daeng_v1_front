import Header from "components/common/Header";
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon";
import ListIcon from "assets/svg/list-icon";
import MACarousel from "components/Admin/SchoolManage/MACarousel";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";
import OwnerWaitingList from "components/Admin/SchoolManage/OwnerWaitingList";
import { ThemeConfig } from "styles/ThemeConfig";

const SchoolManageEnrollmentPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header type="text" text="신규가입" handleClick={() => navigate("/admin/schoolManage")} />
      <PageContainer $padding="calc(5vh + 2rem) 1rem 0" color={ThemeConfig.colors.gray_5}>
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
