import { LayoutContainer } from "components/Member/MyPage/Container/styles";
import AddDogProfile from "components/Member/Profile/AddDogProfile";
import SaveProfileButton from "components/Member/Profile/Button/SaveProfileButton";
import { FormProvider, useForm } from "react-hook-form";

const MemberAddDogProfileEditPage = () => {
  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {}
  });

  return (
    <LayoutContainer pt="calc(5vh + 4rem)" px="1.5rem" pb="calc(7vh + 4rem)" bg="BGray">
      <FormProvider {...methods}>
        <AddDogProfile />
        <SaveProfileButton />
      </FormProvider>
    </LayoutContainer>
  );
};

export default MemberAddDogProfileEditPage;
