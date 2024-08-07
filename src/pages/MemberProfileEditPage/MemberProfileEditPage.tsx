import OnboardingProfile from "components/Member/Profile/OnboardingProfile";
import { useLocalStorageValue } from "hooks/common/useLocalStorage";
import { FormProvider, useForm } from "react-hook-form";
import { AUTH_MEMBER_ID } from "store/auth";
import { PageContainer } from "styles/StyleModule";

import SaveProfileButton from "../../components/Member/Profile/Button/SaveProfileButton";

const MemberProfileEditPage = () => {
  const memberId = useLocalStorageValue<string>(AUTH_MEMBER_ID);
  // const { data } = useGetMemberProfile(Number(memberId));
  //TODO 작업 이후 삭제 필요
  const data = {
    memberId: 1,
    dogId: 1,
    memberProfileUri: "",
    dogProfileUri: "",
    dogName: "거튼이",
    relation: ""
  };
  const { relation, ...rest } = data;
  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { relation: "호칭선택", ...rest }
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
