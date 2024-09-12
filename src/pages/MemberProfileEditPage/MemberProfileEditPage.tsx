import OnboardingProfile from "components/Member/Profile/OnboardingProfile";
import { useGetMemberProfileInfo } from "hooks/api/member/member";
import { FormProvider, useForm } from "react-hook-form";
import { PageContainer } from "styles/StyleModule";

import SaveProfileButton from "../../components/Member/Profile/Button/SaveProfileButton";

const MemberProfileEditPage = () => {
  const { data } = useGetMemberProfileInfo();

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { ...data }
  });

  return (
    <PageContainer ph="1.5" pt="4" pb="4" color="BGray">
      <FormProvider {...methods}>
        <OnboardingProfile />
        <SaveProfileButton />
      </FormProvider>
    </PageContainer>
  );
};

export default MemberProfileEditPage;
