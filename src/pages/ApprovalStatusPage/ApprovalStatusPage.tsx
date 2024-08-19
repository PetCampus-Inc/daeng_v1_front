import { Layout } from "components/common";
import ApprovalStatus from "components/SignUp/ApprovalStatus";
import { useLocation } from "react-router-dom";
import { ApprovalPageStatus, UserType } from "types/common/approval.types";
import { isUserType } from "utils/is";

type StatusViewOption = {
  [key in ApprovalPageStatus]: React.ComponentType<{
    type: UserType;
    schoolName: string;
    userId?: number;
  }>;
};

const statusViews: StatusViewOption = {
  pending: ApprovalStatus.ApprovalPending,
  denied: ApprovalStatus.ApprovalFailed,
  approved: ApprovalStatus.ApprovalSuccess,
  register: ApprovalStatus.RegisterSuccess
};

interface ApprovalStatusPageState {
  userId?: number;
  type: UserType;
  status: ApprovalPageStatus;
  schoolName: string;
}

export default function ApprovalStatusPage() {
  const location = useLocation();
  const { userId, type, status, schoolName }: ApprovalStatusPageState = location.state;

  if (!isUserType(type) || !status || !schoolName || !statusViews[status]) {
    throw new Error("잘못된 접근입니다");
  }

  const StatusComponent = statusViews[status];

  return (
    <Layout bgColor="white" px={16} pt={76}>
      <StatusComponent userId={userId} type={type} schoolName={schoolName} />
    </Layout>
  );
}
