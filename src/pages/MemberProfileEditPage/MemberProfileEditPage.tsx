import { LayoutContainer } from "components/Member/MyPage/Container/styles";
import OnboardingProfile from "components/Member/Profile/OnboardingProfile";
import { FormProvider, useForm } from "react-hook-form";

import SaveProfileButton from "../../components/Member/Profile/Button/SaveProfileButton";

const MemberProfileEditPage = () => {
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
    <LayoutContainer pt="calc(5vh + 4rem)" px="1.5rem" pb="calc(7vh + 4rem)" bg="BGray">
      <FormProvider {...methods}>
        <OnboardingProfile />
        <SaveProfileButton />
      </FormProvider>
    </LayoutContainer>
  );
};

export default MemberProfileEditPage;
