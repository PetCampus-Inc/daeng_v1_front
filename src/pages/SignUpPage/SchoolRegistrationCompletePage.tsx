import { Layout } from "components/common";
import RegisterSuccess from "components/SignUp/ApprovalStatus/RegisterSuccess";
import { useFormContext } from "react-hook-form";

const SchoolRegistrationCompletePage = () => {
  const { getValues } = useFormContext();

  const schoolName = getValues("schoolName");

  return (
    <Layout bgColor="white" px={16} pt={76}>
      <RegisterSuccess schoolName={schoolName} />
    </Layout>
  );
};

export default SchoolRegistrationCompletePage;
