import { LayoutContainer } from "components/Member/MyPage/Container/styles";
import AddDogProfile from "components/Member/Profile/AddDogProfile";
import SaveDogProfileButton from "components/Member/Profile/Button/SaveDogProfileButton";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { dogIdState } from "store/member";

const MemberAddDogProfileEditPage = () => {
  const selectedDogId = useRecoilValue(dogIdState);

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { dogId: selectedDogId }
  });

  return (
    <LayoutContainer pt="calc(5vh + 4rem)" px="1.5rem" pb="calc(7vh + 4rem)" bg="BGray">
      <FormProvider {...methods}>
        <AddDogProfile />
        <SaveDogProfileButton />
      </FormProvider>
    </LayoutContainer>
  );
};

export default MemberAddDogProfileEditPage;
