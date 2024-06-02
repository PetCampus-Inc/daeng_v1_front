import AddDogProfile from "components/Member/Profile/AddDogProfile";
import SaveProfilButton from "components/Member/Profile/Button/SaveProfilButton";
import { FormProvider, useForm } from "react-hook-form";
import { PageContainer } from "styles/StyleModule";

const MemberAddDogProfileEditePage = () => {
  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {}
  });

  return (
    <PageContainer ph="1.5" pt="4" pb="4" color="BGray">
      <FormProvider {...methods}>
        <AddDogProfile />
        <SaveProfilButton />
      </FormProvider>
    </PageContainer>
  );
};

export default MemberAddDogProfileEditePage;
