import AddDogProfile from "components/Member/Profile/AddDogProfile";
import SaveProfileButton from "components/Member/Profile/Button/SaveProfileButton";
import { FormProvider, useForm } from "react-hook-form";
import { PageContainer } from "styles/StyleModule";

const MemberAddDogProfileEditPage = () => {
  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {}
  });

  return (
    <PageContainer ph="1.5" pt="4" pb="4" color="BGray">
      <FormProvider {...methods}>
        <AddDogProfile />
        <SaveProfileButton />
      </FormProvider>
    </PageContainer>
  );
};

export default MemberAddDogProfileEditPage;
