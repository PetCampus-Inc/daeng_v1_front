import { Layout } from "../../components/common";
import ApprovalFailed from "../../components/SignUp/ApprovalStatus/ApprovalFailed";
import ApprovalPending from "../../components/SignUp/ApprovalStatus/ApprovalPending";
import ApprovalSuccess from "../../components/SignUp/ApprovalStatus/ApprovalSuccess";

const ApprovalStatusPage = () => {
  return (
    <Layout type="page" pt={76} position="relative">
      <ApprovalPending />
      {/*<ApprovalSuccess />*/}
      {/*<ApprovalFailed />*/}
    </Layout>
  );
};

export default ApprovalStatusPage;
