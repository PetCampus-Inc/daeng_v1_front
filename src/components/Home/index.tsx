import { memo, useEffect, useState } from "react";
import { Container } from "./styles";
import { useForm } from "react-hook-form";
import Postcode from "components/common/Postcode";
import { Card } from "components/MembershipApplication/Form/styles";
import SearchInputField from "components/common/InputField/SearchInputField";
import Title from "components/common/Title";
import InputField from "components/common/InputField";
import FloatingButton from "components/MembershipApplication/Form/FloatingButton";

const Home = () => {
  const { control, setValue, watch } = useForm();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddressActive, setIsAddressActive] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const addressStreet = "address.street";
  const watchAddress = watch(addressStreet, "");

  useEffect(() => {
    watchAddress !== "" && setIsPopupOpen(false);
  }, [watchAddress]);

  const handleFocus = () => {
    setShowFloatingButton(true);
  };

  const handleBlur = () => {
    setShowFloatingButton(false);
  };

  return (
    <Container>
      {isPopupOpen && (
        <Postcode
          field={addressStreet}
          setValue={setValue}
          closePopup={setIsPopupOpen}
          setIsAddressActive={setIsAddressActive}
        />
      )}
      <Card>
        <Title isRequired={true}>주소</Title>
        <SearchInputField
          control={control}
          name={addressStreet}
          placeholder="주소를 입력해주세요"
          onSearch={() => {
            setIsPopupOpen(!isPopupOpen);
          }}
          onClick={() => {
            setIsPopupOpen(!isPopupOpen);
          }}
          value={watchAddress}
          setValue={setValue}
          readOnly
        />
        {isAddressActive && (
          <InputField
            control={control}
            name="address.detail"
            placeholder="상세 주소를 입력해주세요"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
      </Card>
      <FloatingButton isVisible={showFloatingButton} />
    </Container>
  );
};

export default memo(Home);
