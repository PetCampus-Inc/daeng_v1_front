import { Layout } from "components/common";
import ApprovalFailed from "components/SignUp/ApprovalStatus/ApprovalFailed";
import ApprovalPending from "components/SignUp/ApprovalStatus/ApprovalPending";
import ApprovalSuccess from "components/SignUp/ApprovalStatus/ApprovalSuccess";
import { Role } from "types/admin/admin.type";

import type { ITeacherInfo } from "./AdminSignUpFunnel";

interface ApprovalStatusPageProps {
  info?: ITeacherInfo;
  onSearchSchoolClick?: () => void;
  onSelectRoleClick?: () => void;
}

const ApprovalStatusPage = ({
  info,
  onSearchSchoolClick,
  onSelectRoleClick
}: ApprovalStatusPageProps) => {
  // FIXME: 가입 신청 과정 중에 접근한 경우 or 완료 후 재로그인 후 접근한 경우 `adminId`와 `schoolName` 꺼내오는 방법 다르게 해야함
  const schoolName = info?.schoolName;
  const adminId = info?.adminId;
  const status = info?.role;

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

export default ApprovalStatusPage;
