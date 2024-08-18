import { Layout } from "components/common";
import ApprovalFailed from "components/SignUp/ApprovalStatus/ApprovalFailed";
import ApprovalPending from "components/SignUp/ApprovalStatus/ApprovalPending";
import ApprovalSuccess from "components/SignUp/ApprovalStatus/ApprovalSuccess";
import RegisterSuccess from "components/SignUp/ApprovalStatus/RegisterSuccess";
import { useLocation } from "react-router-dom";
import { ApprovalPageStatus, UserType } from "types/common/approval.types";
import { isUserType } from "utils/is";

interface StatusViewOption {
  status: ApprovalPageStatus;
  component: React.ComponentType<{ type: UserType; schoolName: string }>;
}

const statusViews: StatusViewOption[] = [
  {
    status: "pending",
    component: ApprovalPending
  },
  {
    status: "denied",
    component: ApprovalFailed
  },
  {
    status: "approved",
    component: ApprovalSuccess
  },
  {
    status: "register",
    component: RegisterSuccess
  }
];

export default function ApprovalStatusPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const schoolName = searchParams.get("schoolName");
  if (!type || !status || !schoolName) throw new Error("필수 파라미터가 없습니다");

  if (!isUserType(type)) throw new Error("잘못된 사용자 타입입니다");

  const currentStatus = statusViews.find((view) => view.status === status);
  if (!currentStatus) throw new Error("잘못된 상태 값입니다");

  const StatusComponent = currentStatus.component;

  return (
    <Layout bgColor="white" px={16} pt={76}>
      <StatusComponent type={type} schoolName={schoolName} />
    </Layout>
  );
}
