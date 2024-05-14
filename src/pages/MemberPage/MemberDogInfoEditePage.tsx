import PreventLeaveModal from "components/common/ButtonModal/PreventLeaveModal";
import Header from "components/common/Header";
import SaveButton from "components/Member/DogInfo/DogDetailInfoEdite/Buttons/SaveButton";
import DogDetailInfoEdite from "components/Member/DogInfo/DogDetailInfoEdite/DogDetailInfoEdite";
import { useGetMemberDogDetailnfo } from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay/useOverlay";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const MemberDogInfoEditePage = () => {
  const dogId = 1;
  const overlay = useOverlay();
  const { data } = useGetMemberDogDetailnfo(dogId);
  const { ...rest } = data;
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false,
    defaultValues: { ...rest }
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
          <SaveButton dogId={dogId} />
        </FormProvider>
      </PageContainer>
    </>
  );
};

export default MemberDogInfoEditePage;
