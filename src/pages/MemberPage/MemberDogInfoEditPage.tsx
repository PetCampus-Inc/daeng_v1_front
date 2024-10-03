import { Layout } from "components/common";
import Header from "components/common/Header";
import { PreventLeaveModal } from "components/common/Modal";
import SaveButton from "components/Member/DogInfo/DogDetailInfoEdit/Buttons/SaveButton";
import DogDetailInfoEdit from "components/Member/DogInfo/DogDetailInfoEdit/DogDetailInfoEdit";
import { useGetMemberDogDetailInfo } from "hooks/api/member/member";
import { FormProvider, useForm } from "react-hook-form";
import { useBlocker, useParams } from "react-router-dom";
import { getPadString } from "utils/date";

const MemberDogInfoEditPage = () => {
  const { dogId } = useParams();
  const { data } = useGetMemberDogDetailInfo(Number(dogId));
  const { birthDate, ...rest } = data;

  const [year, month, day] = birthDate.map(Number);

  const dogBirth = {
    year: year,
    month: getPadString(month),
    day: getPadString(day)
  };

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false,
    defaultValues: {
      newBreed: data.breedName,
      year: dogBirth.year,
      month: dogBirth.month,
      day: dogBirth.day,
      ...rest
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
      <Layout pt={44} bgColor="white">
        <FormProvider {...methods}>
          <DogDetailInfoEdit />
          <SaveButton dogId={Number(dogId)} />
        </FormProvider>
      </Layout>
    </>
  );
};

export default MemberDogInfoEditPage;
