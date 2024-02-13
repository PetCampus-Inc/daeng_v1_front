import Header from "components/common/Header";
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon";
import ListIcon from "assets/svg/list-icon";
import SimpleMembershipApplication from "components/Admin/SchoolManage/SimpleMembershipApplication";

const SchoolManageEnrollmentPage = () => {
  return (
    <>
      <Header type="text" text="신규가입" />
      <div style={{ margin: `calc(5vh + 32px) 16px 0` }}>
        <TitleWithIcon title="신규가입" icon={<ListIcon />} />
      </div>
      <SimpleMembershipApplication />
    </>
  );
};

export default SchoolManageEnrollmentPage;
