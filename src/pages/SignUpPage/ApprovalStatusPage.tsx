import { Layout } from "components/common";
import ApprovalFailed from "components/SignUp/ApprovalStatus/ApprovalFailed";
import ApprovalPending from "components/SignUp/ApprovalStatus/ApprovalPending";
import ApprovalSuccess from "components/SignUp/ApprovalStatus/ApprovalSuccess";
import { useFormContext } from "react-hook-form";

interface ApprovalStatusPageProps {
  onSearchSchoolClick?: () => void;
  onSelectRoleClick?: () => void;
}

const ApprovalStatusPage = ({
  onSearchSchoolClick,
  onSelectRoleClick
}: ApprovalStatusPageProps) => {
  const { getValues } = useFormContext();

  const adminId = getValues("id");
  const schoolName = getValues("schoolName");

  // MEMO: 승인 상태에 따라 다른 컴포넌트를 보여줄 수 있도록 구현
  // 최초 페이지 접근 시(가입신청 단계) ApprovalPending 컴포넌트를 보여줌
  // 로그인 후, 다시 가입 신청할 때 > 승인 성공 시 ApprovalSuccess 컴포넌트를 보여줌
  // 로그인 후, 다시 가입 신청할 때 > 승인 실패 시 ApprovalFailed 컴포넌트를 보여줌

  return (
    <Layout type="page" pt={76} position="relative">
      <ApprovalPending adminId={adminId} schoolName={schoolName} onNextStep={onSelectRoleClick} />
      <ApprovalSuccess schoolName={schoolName} />
      <ApprovalFailed schoolName={schoolName} onNextStep={onSearchSchoolClick} />
    </Layout>
  );
};

export default ApprovalStatusPage;
