import SaveProfilButton from "components/Member/Profile/Button/SaveProfilButton";
import OnboardingProfile from "components/Member/Profile/OnboardingProfile";
import { FormProvider, useForm } from "react-hook-form";
import { PageContainer } from "styles/StyleModule";

const MemberOnboardingProfileEditePage = () => {
  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {}
  });

  return (
    <PageContainer ph="1.5" pt="4" pb="4" color="BGray">
      <FormProvider {...methods}>
        <OnboardingProfile />
        <SaveProfilButton />
      </FormProvider>
    </PageContainer>
  );
};

export default MemberOnboardingProfileEditePage;
