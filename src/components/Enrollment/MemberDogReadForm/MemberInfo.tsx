import { GENDER_DATA } from "constants/gender";
import { ITEM_KEYS } from "constants/item";
import { PHONE_REGEX } from "constants/validCheck";

import { TextInput } from "components/common";
import SearchInputField from "components/common/Input/SearchInputField";
import SingleRadio from "components/common/Select/SingleRadio";
import Title from "components/common/Title";
import { useFormContext } from "react-hook-form";
import { handlePreventDefault } from "utils/preventDefault";

import { Card } from "./styles";

const MemberInfo = () => {
  const { register, watch } = useFormContext();
  const requiredItemsMap = new Map<number, boolean>([
    [ITEM_KEYS.MEMBER_NAME, false],
    [ITEM_KEYS.MEMBER_GENDER, true],
    [ITEM_KEYS.MEMBER_ADDRESS, false],
    [ITEM_KEYS.MEMBER_PHONE, false],
    [ITEM_KEYS.EMERGENCY_NUMBER, false]
  ]);

  return (
    <>
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.MEMBER_NAME)}>이름</Title>
        <TextInput
          name="memberName"
          register={register}
          required
          placeholder="견주 이름을 입력해주세요"
          readOnly
        />
      </Card>
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.MEMBER_GENDER)}>성별</Title>
        <SingleRadio
          name="memberGender"
          radiosText={["남", "여"]}
          defaultSelect={
            watch("memberGender") && GENDER_DATA[watch("memberGender")] === "여성" ? "여" : "남"
          }
          preventDefaultClick={handlePreventDefault}
        />
      </Card>
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.MEMBER_ADDRESS)}>주소</Title>
        <SearchInputField
          name="address"
          register={register}
          value={watch("address") && watch("address")}
          required={requiredItemsMap?.get(ITEM_KEYS.MEMBER_ADDRESS)}
          readOnly
          placeholder="주소를 입력해주세요"
        />
        <TextInput
          name="addressDetail"
          register={register}
          placeholder="상세 주소를 입력해주세요"
          value={watch("addressDetail") && watch("addressDetail")}
          readOnly
        />
      </Card>
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.MEMBER_PHONE)}>연락처</Title>
        <TextInput
          name="phoneNumber"
          register={register}
          required
          rules={{ pattern: PHONE_REGEX }}
          placeholder="연락처를 입력해주세요"
          readOnly
        />
      </Card>
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.EMERGENCY_NUMBER)}>비상 연락처</Title>
        <TextInput
          name="emergencyPhoneNumber"
          register={register}
          required={requiredItemsMap?.get(ITEM_KEYS.EMERGENCY_NUMBER)}
          rules={{ pattern: PHONE_REGEX }}
          placeholder="비상 연락처를 입력해주세요"
          readOnly
        />
      </Card>
    </>
  );
};

export default MemberInfo;
