import ProfileEdite from "components/Member/Profile/ProfileEdite";
import { FormProvider, useForm } from "react-hook-form";
import { PageContainer } from "styles/StyleModule";

const MemberProfileEditePage = () => {
  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {}
  });

  return (
    <PageContainer pt="4" color="BGray">
      <FormProvider {...methods}>
        <ProfileEdite />
      </FormProvider>
    </PageContainer>
  );
};

export default MemberProfileEditePage;
