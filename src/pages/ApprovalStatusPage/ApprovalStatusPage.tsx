import { SCHOOL_NAME_KEY } from "constants/storage";

import { Layout } from "components/common";
import ApprovalStatusView from "components/SignUp/ApprovalStatus";
import { useLocalStorage } from "hooks/common/useLocalStorage";
import { useTokenHandler } from "hooks/common/useTokenHandler";
import { User } from "types/common/role.types";
import { type ApprovalStatus } from "types/common/status.types";
import { isApproval } from "utils/is";

type StatusViewOption = {
  [key in ApprovalStatus]?: React.ComponentType<{ user: User; schoolName: string }>;
};

const statusViews: StatusViewOption = {
  APPROVED: ApprovalStatusView.ApprovalSuccess,
  APPROVAL_PENDING: ApprovalStatusView.ApprovalPending,
  APPROVAL_DENIED: ApprovalStatusView.ApprovalFailed
};

export default function ApprovalStatusPage() {
  const { role, user } = useTokenHandler();
  const [schoolName] = useLocalStorage<string | null>(SCHOOL_NAME_KEY, null);

  if (!isApproval(role) || !schoolName) throw new Error("잘못 된 접근입니다.");

  const StatusComponent = statusViews[role];
  if (!StatusComponent) throw new Error("잘못 된 접근입니다.");

  return (
    <Layout bgColor="white" px={16} pt={76}>
      <StatusComponent user={user} schoolName={schoolName} />
    </Layout>
  );
}
