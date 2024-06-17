import PreventLeaveModal from "components/common/ButtonModal/PreventLeaveModal";
import Header from "components/common/Header";
import SaveButton from "components/Member/DogInfo/DogDetailInfoEdit/Buttons/SaveButton";
import DogDetailInfoEdit from "components/Member/DogInfo/DogDetailInfoEdit/DogDetailInfoEdit";
import { useGetMemberDogDetailInfo } from "hooks/api/member/member";
import { FormProvider, useForm } from "react-hook-form";
import { useBlocker, useParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";
import { addZero } from "utils/date";

const MemberDogInfoEditPage = () => {
  const { dogId } = useParams();
  const { data } = useGetMemberDogDetailInfo(Number(dogId));
  const { birthDate, ...rest } = data;

  const [year, month, day] = birthDate.map(Number);

  const dogBirth = {
    year: year,
    month: addZero(month),
    day: addZero(day)
  };

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false,
    defaultValues: {
      year: dogBirth.year,
      month: dogBirth.month,
      day: dogBirth.day,
      breedId: rest.breedId,
      breedName: rest.breedName,
      dogName: rest.dogName,
      dogGender: rest.dogGender,
      dogSize: rest.dogSize,
      neutralization: rest.neutralization
    }
  });

  const blocker = useBlocker(() => methods.formState.isDirty);

  return (
    <>
      {blocker.state === "blocked" ? (
        <PreventLeaveModal
          isOpen={true}
          close={() => blocker.reset()}
          action={() => blocker.proceed()}
        />
      ) : null}
      <Header type="text" text={`${data.dogName}의 가입정보 수정`} />
      <PageContainer pt="1">
        <FormProvider {...methods}>
          <DogDetailInfoEdit />
          <SaveButton dogId={Number(dogId)} />
        </FormProvider>
      </PageContainer>
    </>
  );
};

export default MemberDogInfoEditPage;
