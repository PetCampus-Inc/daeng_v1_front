import PreventLeaveModal from "components/common/ButtonModal/PreventLeaveModal";
import Header from "components/common/Header";
import SaveButton from "components/Member/DogInfo/DogDetailInfoEdite/Buttons/SaveButton";
import DogDetailInfoEdite from "components/Member/DogInfo/DogDetailInfoEdite/DogDetailInfoEdite";
import { useGetMemberDogDetailnfo } from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay/useOverlay";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";
import { addZero } from "utils/date";

const MemberDogInfoEditPage = () => {
  const { dogId } = useParams();
  const overlay = useOverlay();
  const { data } = useGetMemberDogDetailnfo(Number(dogId));
  const { ...rest } = data;
  const navigate = useNavigate();

  const [year, month, day] = data.dogBirthDate.map(Number);

  const dogBirth = {
    year: year,
    month: addZero(month),
    day: addZero(day)
  };

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false,
    defaultValues: { year: dogBirth.year, month: dogBirth.month, day: dogBirth.day, ...rest }
  });

  const openPreventLeavePopup = () =>
    overlay.open(({ isOpen, close }) => (
      <PreventLeaveModal isOpen={isOpen} close={close} action={() => navigate(-1)} />
    ));

  return (
    <>
      <Header
        type="text"
        text={`${data.dogName}의 가입정보 수정`}
        handleClick={openPreventLeavePopup}
      />
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
