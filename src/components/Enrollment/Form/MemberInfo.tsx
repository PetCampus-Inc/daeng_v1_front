import { ITEM_KEYS } from "constants/item";
import { PHONE_REGEX } from "constants/validCheck";

import { TextInput } from "components/common";
import SearchInputField from "components/common/Input/SearchInputField";
import Postcode from "components/common/Postcode";
import SingleRadio from "components/common/Select/SingleRadio";
import Title from "components/common/Title";
import { useOverlay } from "hooks/common/useOverlay";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { formatPhoneNumber } from "utils/formatter";

import { Card } from "./styles";
interface MemberInfoProps {
  requiredItems: Map<number, boolean>;
}

const MemberInfo = ({ requiredItems }: MemberInfoProps) => {
  const { register, setValue, watch } = useFormContext();
  const [isAddressActive, setIsAddressActive] = useState(false);
  const overlay = useOverlay();

  const addressStreet = "address.street";
  const watchAddress = watch(addressStreet, "");

  const handleChangeNumber = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    setValue(field, formattedValue);
  };

  const handleClear = () => {
    setValue(addressStreet, "");
    setValue("address.detail", "");
    setIsAddressActive(false);
  };

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <Postcode
        isOpen={isOpen}
        close={close}
        field={addressStreet}
        setValue={setValue}
        setIsAddressActive={setIsAddressActive}
      />
    ));

  return (
    <>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.MEMBER_NAME)}>이름</Title>
        <TextInput
          name="memberName"
          register={register}
          required
          placeholder="견주 이름을 입력해주세요"
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.MEMBER_GENDER)}>성별</Title>
        <SingleRadio name="memberGender" radiosText={["남", "여"]} />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.MEMBER_ADDRESS)}>주소</Title>
        <SearchInputField
          name={addressStreet}
          register={register}
          onSearch={openPopup}
          onClick={openPopup}
          onClear={handleClear}
          value={watchAddress}
          required={requiredItems?.get(ITEM_KEYS.MEMBER_ADDRESS)}
          readOnly
          placeholder="주소를 입력해주세요"
        />
        {isAddressActive && (
          <TextInput
            name="address.detail"
            register={register}
            placeholder="상세 주소를 입력해주세요"
          />
        )}
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.MEMBER_PHONE)}>연락처</Title>
        <TextInput
          name="phoneNumber"
          register={register}
          required={requiredItems?.get(ITEM_KEYS.MEMBER_PHONE)}
          rules={{ pattern: PHONE_REGEX }}
          onChange={handleChangeNumber("phoneNumber")}
          placeholder="연락처를 입력해주세요"
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.EMERGENCY_NUMBER)}>비상 연락처</Title>
        <TextInput
          name="emergencyNumber"
          register={register}
          required={requiredItems?.get(ITEM_KEYS.EMERGENCY_NUMBER)}
          rules={{ pattern: PHONE_REGEX }}
          onChange={handleChangeNumber("emergencyNumber")}
          placeholder="비상 연락처를 입력해주세요"
        />
      </Card>
    </>
  );
};

export default MemberInfo;
