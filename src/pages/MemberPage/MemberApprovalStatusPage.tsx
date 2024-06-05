import { Layout } from "components/common";
import ApprovalSuccess from "components/Enrollment/ApprovalStatus/ApprovalSuccess";
import ApprovalFailed from "components/SignUp/ApprovalStatus/ApprovalFailed";
import ApprovalPending from "components/SignUp/ApprovalStatus/ApprovalPending";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { ITeacherInfo } from "pages/SignUpPage/AdminSignUpFunnel";
import { useLocation } from "react-router-dom";
import { Role } from "types/admin/admin.type";

interface ApprovalStatusPageProps {
  info?: ITeacherInfo;
  onSearchSchoolClick?: () => void;
  onSelectRoleClick?: () => void;
}

const MemberApprovalStatusPage = ({
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
  // 최초 페이지 접근 시(가입신청 단계) ApprovalPending 컴포넌트를 보여줌
  // 로그인 후, 다시 가입 신청할 때 > 승인 성공 시 ApprovalSuccess 컴포넌트를 보여줌
  // 로그인 후, 다시 가입 신청할 때 > 승인 실패 시 ApprovalFailed 컴포넌트를 보여줌

  return (
    <Layout type="page" pt={76} position="relative">
      {status === Role.APPROVAL_PENDING && (
        <ApprovalPending adminId={adminId} schoolName={schoolName} onNextStep={onSelectRoleClick} />
      )}
      {status === Role.ROLE_TEACHER && <ApprovalSuccess schoolName={schoolName} />}
      {status === Role.APPROVAL_DENIED && (
        <ApprovalFailed schoolName={schoolName} onNextStep={onSearchSchoolClick} />
      )}
    </Layout>
  );
};

export default MemberApprovalStatusPage;
