import AddDogProfile from "components/Member/Profile/AddDogProfile";
import SaveDogProfileButton from "components/Member/Profile/Button/SaveDogProfileButton";
import { useLocalStorageValue } from "hooks/common/useLocalStorage";
import { FormProvider, useForm } from "react-hook-form";
import { PageContainer } from "styles/StyleModule";

const MemberAddDogProfileEditPage = () => {
  const CURRENT_DOG_ID = useLocalStorageValue<string>("CURRENT-DOG-ID");

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { dogId: CURRENT_DOG_ID }
  });

  return (
    <PageContainer ph="1.5" pt="4" pb="4" color="BGray">
      <FormProvider {...methods}>
        <AddDogProfile />
        <SaveDogProfileButton />
      </FormProvider>
    </PageContainer>
  );
};

export default MemberAddDogProfileEditPage;
