import { FIELD, FIELD_KEYS } from "constants/field";
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

  const handleChangeNumber = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    setValue(field, formattedValue);
  };

  const watchAddress = watch(FIELD.MEMBER_ADDRESS, "");

  const handleClear = () => {
    setValue(FIELD.MEMBER_ADDRESS, "");
    setValue("address.detail", "");
    setIsAddressActive(false);
  };

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <Postcode
        isOpen={isOpen}
        close={close}
        field={FIELD.MEMBER_ADDRESS}
        setValue={setValue}
        setIsAddressActive={setIsAddressActive}
      />
    ));

  return (
    <>
      <Card>
        <Title isRequired={requiredItems?.get(FIELD_KEYS.MEMBER_NAME)}>이름</Title>
        <TextInput
          name={FIELD.MEMBER_NAME}
          register={register}
          required
          placeholder="견주 이름을 입력해주세요"
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(FIELD_KEYS.MEMBER_GENDER)}>성별</Title>
        <SingleRadio name={FIELD.MEMBER_GENDER} radiosText={["남", "여"]} />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(FIELD_KEYS.MEMBER_ADDRESS)}>주소</Title>
        <SearchInputField
          name={FIELD.MEMBER_ADDRESS}
          register={register}
          onSearch={openPopup}
          onClick={openPopup}
          onClear={handleClear}
          value={watchAddress}
          required={requiredItems?.get(FIELD_KEYS.MEMBER_ADDRESS)}
          readOnly
          placeholder="주소를 입력해주세요"
        />
        {isAddressActive && (
          <TextInput
            name={FIELD.MEMBER_ADDRESS_DETAIL}
            register={register}
            placeholder="상세 주소를 입력해주세요"
          />
        )}
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(FIELD_KEYS.MEMBER_PHONE)}>연락처</Title>
        <TextInput
          name={FIELD.MEMBER_PHONE}
          register={register}
          required={requiredItems?.get(FIELD_KEYS.MEMBER_PHONE)}
          rules={{ pattern: PHONE_REGEX }}
          onChange={handleChangeNumber(FIELD.MEMBER_PHONE)}
          placeholder="연락처를 입력해주세요"
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(FIELD_KEYS.EMERGENCY_NUMBER)}>비상 연락처</Title>
        <TextInput
          name={FIELD.EMERGENCY_NUMBER}
          register={register}
          required={requiredItems?.get(FIELD_KEYS.EMERGENCY_NUMBER)}
          rules={{ pattern: PHONE_REGEX }}
          onChange={handleChangeNumber(FIELD.EMERGENCY_NUMBER)}
          placeholder="비상 연락처를 입력해주세요"
        />
      </Card>
    </>
  );
};

export default MemberInfo;
