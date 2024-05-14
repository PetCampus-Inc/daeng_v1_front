import Header from "components/common/Header";
import SaveButton from "components/Member/DogInfo/DogDetailInfoEdite/Buttons/SaveButton";
import DogDetailInfoEdite from "components/Member/DogInfo/DogDetailInfoEdite/DogDetailInfoEdite";
import { useGetMemberDogDetailnfo } from "hooks/api/member/member";
import { FormProvider, useForm } from "react-hook-form";
import { PageContainer } from "styles/StyleModule";

const MemberDogInfoEditePage = () => {
  const dogId = 1;
  const { data } = useGetMemberDogDetailnfo(dogId);
  const { ...rest } = data;

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false,
    defaultValues: { ...rest }
  });

  return (
    <>
      <Header type="text" text={`${data.dogName}의 가입정보 수정`} />
      <PageContainer pt="1">
        <FormProvider {...methods}>
          <DogDetailInfoEdite />
          <SaveButton dogId={dogId} />
        </FormProvider>
      </PageContainer>
    </>
  );
};

export default MemberDogInfoEditePage;
