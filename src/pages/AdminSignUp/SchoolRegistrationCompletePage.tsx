import { Layout } from "components/common";
import SchoolRegisterSuccess from "components/SignUp/ApprovalStatus/SchoolRegisterSuccess";
import { useFormContext } from "react-hook-form";

const SchoolRegistrationCompletePage = () => {
  const { getValues } = useFormContext();

  const schoolName = getValues("schoolName");

  return (
    <Layout type="page" pt={76} position="relative">
      <SchoolRegisterSuccess schoolName={schoolName} />
    </Layout>
  );
};

export default SchoolRegistrationCompletePage;
