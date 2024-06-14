import SaveProfilButton from "components/Member/Profile/Button/SaveProfilButton";
import OnboardingProfile from "components/Member/Profile/OnboardingProfile";
import { useGetMemberProfile } from "hooks/api/member/member";
import { useLocalStorageValue } from "hooks/common/useLocalStorage";
import { FormProvider, useForm } from "react-hook-form";
import { AUTH_MEMBER_ID } from "store/auth";
import { PageContainer } from "styles/StyleModule";

const MemberProfileEditPage = () => {
  const memberId = useLocalStorageValue<string>(AUTH_MEMBER_ID);
  const { data } = useGetMemberProfile(Number(memberId));
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

export default MemberProfileEditPage;
