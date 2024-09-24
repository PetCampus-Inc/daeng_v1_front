import { STORAGE_KEY } from "constants/memberDogStatus";

import { LayoutContainer } from "components/Member/MyPage/Container/styles";
import AddDogProfile from "components/Member/Profile/AddDogProfile";
import SaveDogProfileButton from "components/Member/Profile/Button/SaveDogProfileButton";
import { useLocalStorage } from "hooks/common/useLocalStorage";
import { FormProvider, useForm } from "react-hook-form";

const MemberAddDogProfileEditPage = () => {
  const CURRENT_DOG_ID = useLocalStorage<string>(STORAGE_KEY.CURRENT_DOG_ID, "");

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { dogId: CURRENT_DOG_ID }
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
