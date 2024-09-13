import OnboardingProfile from "components/Member/Profile/OnboardingProfile";
import { useGetMemberProfileInfo } from "hooks/api/member/member";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { dogIdState } from "store/member";
import { PageContainer } from "styles/StyleModule";

import SaveProfileButton from "../../components/Member/Profile/Button/SaveProfileButton";

const MemberProfileEditPage = () => {
  const dogId = useRecoilValue(dogIdState);
  const { data } = useGetMemberProfileInfo();

  const defaultValues = {
    dogId: dogId ?? 1, // FIXME dogId 어디서 가져와야하는지?
    memberProfileUri: "",
    dogProfileUri: "",
    nickName: data.memberProfileUri,
    relation: ""
  };

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { ...defaultValues }
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
