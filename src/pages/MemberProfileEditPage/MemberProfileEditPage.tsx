import { LayoutContainer } from "components/Member/MyPage/Container/styles";
import OnboardingProfile from "components/Member/Profile/OnboardingProfile";
import { useGetMemberProfile } from "hooks/api/member/member";
import { FormProvider, useForm } from "react-hook-form";

import SaveProfileButton from "../../components/Member/Profile/Button/SaveProfileButton";

const MemberProfileEditPage = () => {
  const { data } = useGetMemberProfile();

  const { dogName, ...rest } = data;

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { ...rest, nickName: dogName, dogName: dogName, relation: "호칭선택" }
  });

  return (
    <LayoutContainer pt="calc(5vh + 4rem)" px="1.5rem" pb="calc(7vh + 4rem)" bg="BGray">
      <FormProvider {...methods}>
        <OnboardingProfile />
        <SaveProfileButton />
      </FormProvider>
    </LayoutContainer>
  );
};

export default MemberProfileEditPage;
