import { ITEM_KEYS } from "constants/item";
import { PHONE_REGEX } from "constants/validCheck";

import InputField from "components/common/InputField";
import SearchInputField from "components/common/InputField/SearchInputField";
import Postcode from "components/common/Postcode";
import SingleRadio from "components/common/Select/SingleRadio";
import Title from "components/common/Title";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { formatPhoneNumber } from "utils/formatter";

import { Card } from "./styles";
interface MemberInfoProps {
  requiredItems: Map<number, boolean>;
}

const MemberInfo = ({ requiredItems }: MemberInfoProps) => {
  const { register, setValue, watch } = useFormContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddressActive, setIsAddressActive] = useState(false);

  const addressStreet = "address.street";
  const watchAddress = watch(addressStreet, "");

  const handleChangeNumber = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    setValue(field, formattedValue);
  };

  useEffect(() => {
    watchAddress !== "" && setIsPopupOpen(false);
  }, [watchAddress]);

  return (
    <>
      {isPopupOpen && (
        <Postcode
          field={addressStreet}
          setValue={setValue}
          closePopup={setIsPopupOpen}
          setIsAddressActive={setIsAddressActive}
        />
      )}
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.MEMBER_NAME)}>이름</Title>
        <InputField
          name="memberName"
          register={register}
          isRequired
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
          placeholder="주소를 입력해주세요"
          register={register}
          onSearch={() => {
            setIsPopupOpen(!isPopupOpen);
          }}
          onClick={() => {
            setIsPopupOpen(!isPopupOpen);
          }}
          value={watchAddress}
          setValue={setValue}
          isRequired={requiredItems?.get(ITEM_KEYS.MEMBER_ADDRESS)}
          readOnly
        />
        {isAddressActive && (
          <InputField
            name="address.detail"
            placeholder="상세 주소를 입력해주세요"
            register={register}
          />
        )}
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.MEMBER_PHONE)}>연락처</Title>
        <InputField
          name="phoneNumber"
          register={register}
          isRequired
          pattern={PHONE_REGEX}
          onChange={handleChangeNumber("phoneNumber")}
          placeholder="연락처를 입력해주세요"
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.EMERGENCY_NUMBER)}>비상 연락처</Title>
        <InputField
          name="emergencyNumber"
          register={register}
          isRequired={requiredItems?.get(ITEM_KEYS.EMERGENCY_NUMBER)}
          pattern={PHONE_REGEX}
          onChange={handleChangeNumber("emergencyNumber")}
          placeholder="비상 연락처를 입력해주세요"
        />
      </Card>
    </>
  );
};

export default MemberInfo;
