import Header from "components/common/Header";
import SaveButton from "components/Member/DogInfo/DogDetailInfoEdite/Buttons/SaveButton";
import DogDetailInfoEdite from "components/Member/DogInfo/DogDetailInfoEdite/DogDetailInfoEdite";
import { useGetMemberDogDetailInfo } from "hooks/api/member/member";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
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

  return (
    <>
      <Header type="text" text={`${data.dogName}의 가입정보 수정`} />
      <PageContainer pt="1">
        <FormProvider {...methods}>
          <DogDetailInfoEdite />
          <SaveButton dogId={Number(dogId)} />
        </FormProvider>
      </PageContainer>
    </>
  );
};

export default MemberDogInfoEditPage;
