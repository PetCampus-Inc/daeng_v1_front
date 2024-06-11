import { Layout } from "components/common";
import AdminApprovalFailed from "components/SignUp/ApprovalStatus/AdminApprovalFailed";
import AdminApprovalPending from "components/SignUp/ApprovalStatus/AdminApprovalPending";
import AdminApprovalSuccess from "components/SignUp/ApprovalStatus/AdminApprovalSuccess";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useLocation } from "react-router-dom";
import { Role } from "types/admin/admin.type";

import type { ITeacherInfo } from "./AdminSignUpFunnel";

interface ApprovalStatusPageProps {
  info?: ITeacherInfo;
  onSearchSchoolClick?: () => void;
  onSelectRoleClick?: () => void;
}

const AdminApprovalStatusPage = ({
  info,
  onSearchSchoolClick,
  onSelectRoleClick
}: ApprovalStatusPageProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isLoginSource = searchParams.get("source") === "login";

  const loginInfo = useAdminInfo();

  const schoolName = isLoginSource ? loginInfo.schoolName : info?.schoolName;
  const adminId = isLoginSource ? loginInfo.adminId : info?.adminId;
  const status = isLoginSource ? loginInfo.role : info?.role;

  // MEMO: 승인 상태에 따라 다른 컴포넌트를 보여줄 수 있도록 구현
  // 최초 페이지 접근 시(가입신청 단계) AdminApprovalPending 컴포넌트를 보여줌
  // 로그인 후, 다시 가입 신청할 때 > 승인 성공 시 AdminApprovalSuccess 컴포넌트를 보여줌
  // 로그인 후, 다시 가입 신청할 때 > 승인 실패 시 AdminApprovalFailed 컴포넌트를 보여줌

  return (
    <Layout type="page" pt={76} position="relative">
      {status === Role.APPROVAL_PENDING && (
        <AdminApprovalPending
          adminId={adminId}
          schoolName={schoolName}
          onNextStep={onSelectRoleClick}
        />
      )}
      {status === Role.ROLE_TEACHER && <AdminApprovalSuccess schoolName={schoolName} />}
      {status === Role.APPROVAL_DENIED && (
        <AdminApprovalFailed schoolName={schoolName} onNextStep={onSearchSchoolClick} />
      )}
    </Layout>
  );
};

export default AdminApprovalStatusPage;
