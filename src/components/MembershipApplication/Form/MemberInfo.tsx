import { useFormContext } from "react-hook-form";

import Title from "components/common/Title";
import SingleRadio from "components/common/Select/SingleRadio";
import InputField from "components/common/InputField";
import SearchInputField from "components/common/InputField/SearchInputField";
import { ITEM_KEYS } from "constants/item";
import { NAME_REGEX, PHONE_REGEX } from "constants/validCheck";
import { formatPhoneNumber } from "utils/formatter";

import { useEffect, useState } from "react";
import Postcode from "components/common/Postcode";

import { Card } from "./styles";
interface MemberInfoProps {
  requiredItems: Map<number, boolean>;
}

const MemberInfo = ({ requiredItems }: MemberInfoProps) => {
  const { control, setValue, watch } = useFormContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
        <Postcode field={addressStreet} setValue={setValue} closePopup={setIsPopupOpen} />
      )}
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.MEMBER_NAME)}>이름</Title>
        <InputField
          control={control}
          name="memberName"
          rules={{
            required: requiredItems.get(ITEM_KEYS.MEMBER_NAME),
            pattern: {
              value: NAME_REGEX,
              message: "한글 1~10자로 입력해주세요"
            }
          }}
          placeholder="견주 이름을 입력해주세요"
        />
      </Card>
      <Card>
        <Title>성별</Title>
        <SingleRadio name="memberGender" radiosText={["남", "여"]} />
      </Card>
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.MEMBER_ADDRESS)}>주소</Title>
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

        <InputField
          control={control}
          name="address.detail"
          placeholder="상세 주소를 입력해주세요"
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.MEMBER_PHONE)}>연락처</Title>
        <InputField
          control={control}
          name="phoneNumber"
          rules={{
            required: requiredItems.get(ITEM_KEYS.MEMBER_PHONE),
            pattern: {
              value: PHONE_REGEX,
              message: "휴대폰 번호를 입력해주세요 (ex. 010-1234-5678)"
            }
          }}
          onChange={handleChangeNumber("phoneNumber")}
          placeholder="연락처를 입력해주세요"
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.EMERGENCY_NUMBER)}>비상 연락처</Title>
        <InputField
          control={control}
          name="emergencyNumber"
          rules={{
            required: requiredItems.get(ITEM_KEYS.EMERGENCY_NUMBER),
            pattern: {
              value: PHONE_REGEX,
              message: "휴대폰 번호를 입력해주세요 (ex. 010-1234-5678)"
            }
          }}
          onChange={handleChangeNumber("emergencyNumber")}
          placeholder="비상 연락처를 입력해주세요"
        />
      </Card>
    </>
  );
};

export default MemberInfo;
