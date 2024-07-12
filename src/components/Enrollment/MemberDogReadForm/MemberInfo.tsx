import { FIELD, FIELD_KEYS } from "constants/field";
import { GENDER_DATA } from "constants/gender";
import { REQUIRED_ITEMS_DOG_MAP } from "constants/requiredItemsMap";
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

  return (
    <>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.MEMBER_NAME)}>이름</Title>
        <TextInput
          name={FIELD.MEMBER_NAME}
          register={register}
          required
          placeholder="견주 이름을 입력해주세요"
          readOnly
        />
      </Card>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.MEMBER_GENDER)}>성별</Title>
        <SingleRadio
          name={FIELD.MEMBER_GENDER}
          radiosText={["남", "여"]}
          defaultSelect={
            watch(FIELD.MEMBER_GENDER) && GENDER_DATA[watch(FIELD.MEMBER_GENDER)] === "여성"
              ? "여"
              : "남" // MEMO: 여, 남이 아닌 여성, 남성으로 값을 관리하는 이유가 있나요?
          }
          preventDefaultClick={handlePreventDefault}
        />
      </Card>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.MEMBER_ADDRESS)}>주소</Title>
        <SearchInputField
          name={FIELD.MEMBER_ADDRESS}
          register={register}
          required={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.MEMBER_ADDRESS)}
          readOnly
          placeholder="주소를 입력해주세요"
        />
        <TextInput
          name={FIELD.MEMBER_ADDRESS_DETAIL}
          register={register}
          placeholder="상세 주소를 입력해주세요"
          readOnly
        />
      </Card>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.MEMBER_PHONE)}>연락처</Title>
        <TextInput
          name={FIELD.MEMBER_PHONE}
          register={register}
          required
          rules={{ pattern: PHONE_REGEX }}
          placeholder="연락처를 입력해주세요"
          readOnly
        />
      </Card>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.EMERGENCY_NUMBER)}>
          비상 연락처
        </Title>
        <TextInput
          name={FIELD.EMERGENCY_NUMBER}
          register={register}
          required={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.EMERGENCY_NUMBER)}
          rules={{ pattern: PHONE_REGEX }}
          placeholder="비상 연락처를 입력해주세요"
          readOnly
        />
      </Card>
    </>
  );
};

export default MemberInfo;
