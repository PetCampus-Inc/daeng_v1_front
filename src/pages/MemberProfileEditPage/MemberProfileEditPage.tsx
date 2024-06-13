import SaveProfilButton from "components/Member/Profile/Button/SaveProfilButton";
import OnboardingProfile from "components/Member/Profile/OnboardingProfile";
import { useGetMemberProfile } from "hooks/api/member/member";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const MemberProfileEditPage = () => {
  // TODO memeberId 데이터 가져오기
  const { memberId } = useParams();
  // const { data } = useGetMemberProfile(Number(memberId));
  //TODO 수정필요 - 목업 데이터
  const data = {
    memberId: 1,
    dogId: 1,
    memberProfileUri: "",
    dogProfileUri: "",
    dogName: "거튼이",
    relation: ""
  };
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