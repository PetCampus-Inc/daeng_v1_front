import SaveProfilButton from "components/Member/Profile/Button/SaveProfilButton";
import OnboardingProfile from "components/Member/Profile/OnboardingProfile";
import { useGetMemberProfile } from "hooks/api/member/member";
import { FormProvider, useForm } from "react-hook-form";
import { PageContainer } from "styles/StyleModule";

const MemberOnboardingProfileEditePage = () => {
  // TODO memeberId 데이터 가져오기
  const memberId = 11;
  const { data } = useGetMemberProfile(memberId);
  const { ...rest } = data;

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { ...rest }
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
