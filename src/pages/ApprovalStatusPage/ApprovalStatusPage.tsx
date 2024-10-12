import { routes } from "constants/path";
import { SCHOOL_NAME_KEY, USER_TYPE_KEY } from "constants/storage";

import { Layout } from "components/common";
import ApprovalStatusView from "components/SignUp/ApprovalStatus";
import { useLocalStorage } from "hooks/common/useLocalStorage";
import { useTokenHandler } from "hooks/common/useTokenHandler";
import { Navigate } from "react-router-dom";
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
  const { role } = useTokenHandler();
  const [user] = useLocalStorage<User | null>(USER_TYPE_KEY, null);
  const [schoolName] = useLocalStorage<string | null>(SCHOOL_NAME_KEY, null);

  if (!isApproval(role) || !user || !schoolName) return <Navigate to={routes.login.root} />;

  const StatusComponent = statusViews[role];
  if (!StatusComponent) return <Navigate to={routes.login.root} />;

  return (
    <Layout type="page" bgColor="white" px={16} pt={76}>
      <StatusComponent user={user} schoolName={schoolName} />
    </Layout>
  );
}
