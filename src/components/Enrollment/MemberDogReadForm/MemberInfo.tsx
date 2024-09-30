import { FIELD, FIELD_KEYS } from "constants/field";
import { REQUIRED_ITEMS_DOG_MAP } from "constants/requiredItemsMap";

import { TextInput } from "components/common";
import SearchInputField from "components/common/Input/SearchInputField";
import SingleRadio from "components/common/Select/SingleRadio";
import Title from "components/common/Title";
import { useFormContext } from "react-hook-form";
import { getLabelForValue } from "utils/formatter";

import { Card } from "./styles";

const MemberInfo = () => {
  const { register, getValues } = useFormContext();
  const { address, addressDetail, emergencyPhoneNumber, phoneNumber, memberGender } = getValues();
  const formatMemberGender = getLabelForValue(FIELD.MEMBER_GENDER, memberGender);

  return (
    <>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.MEMBER_NAME)}>이름</Title>
        <TextInput
          name={FIELD.MEMBER_NAME}
          register={register}
          placeholder="견주 이름을 입력해주세요"
          readOnly
        />
      </Card>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.MEMBER_GENDER)}>성별</Title>
        <SingleRadio
          name={FIELD.MEMBER_GENDER}
          radiosText={["남", "여"]}
          defaultSelect={formatMemberGender}
        />
      </Card>

      {(address || addressDetail) && (
        <Card>
          <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.MEMBER_ADDRESS)}>주소</Title>
          {address && (
            <SearchInputField
              name={FIELD.MEMBER_ADDRESS}
              register={register}
              placeholder="주소를 입력해주세요"
              readOnly
            />
          )}

          {addressDetail && (
            <TextInput
              name={FIELD.MEMBER_ADDRESS_DETAIL}
              register={register}
              placeholder="상세 주소를 입력해주세요"
              readOnly
            />
          )}
        </Card>
      )}

      {phoneNumber && (
        <Card>
          <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.MEMBER_PHONE)}>연락처</Title>
          <TextInput
            name={FIELD.MEMBER_PHONE}
            register={register}
            placeholder="연락처를 입력해주세요"
            readOnly
          />
        </Card>
      )}

      {emergencyPhoneNumber && (
        <Card>
          <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.EMERGENCY_NUMBER)}>
            비상 연락처
          </Title>
          <TextInput
            name={FIELD.EMERGENCY_NUMBER}
            register={register}
            placeholder="비상 연락처를 입력해주세요"
            readOnly
          />
        </Card>
      )}
    </>
  );
};

export default MemberInfo;
