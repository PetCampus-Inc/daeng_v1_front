import { LayoutContainer } from "components/Member/MyPage/Container/styles";
import OnboardingProfile from "components/Member/Profile/OnboardingProfile";
import { useGetMemberProfile } from "hooks/api/member/member";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { dogIdState } from "store/member";

import SaveProfileButton from "../../components/Member/Profile/Button/SaveProfileButton";

const MemberProfileEditPage = () => {
  const dogId = useRecoilValue(dogIdState);
  // const { data } = useGetMemberProfile();

  const defaultValues = {
    dogId: 1, // FIXME dogId 어디서 가져와야하는지?
    memberProfileUri: "",
    dogProfileUri: "",
    dogName: "거튼이",
    relation: ""
  };

  const { dogName, ...rest } = defaultValues;

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { ...rest, nickName: dogName }
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
