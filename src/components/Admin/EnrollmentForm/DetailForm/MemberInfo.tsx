import { FIELD, FIELD_KEYS } from "constants/field";

import { BadgeLabel, TextInput } from "components/common";
import SearchInputField from "components/common/Input/SearchInputField";
import SingleRadio from "components/common/Select/SingleRadio";
import { useFormContext } from "react-hook-form";

import { Card } from "../styles";
interface MemberInfoProps {
  item?: Map<number, boolean>;
}

export function MemberInfo({ item }: MemberInfoProps) {
  const { register } = useFormContext();
  return (
    <>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.MEMBER_NAME)}>이름</BadgeLabel>
        <TextInput
          {...register(FIELD.MEMBER_NAME)}
          placeholder="견주 이름을 입력해주세요"
          readOnly
        />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.MEMBER_GENDER)}>성별</BadgeLabel>
        <SingleRadio name="memberGender" radiosText={["남", "여"]} isPreviewMode disabled />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.MEMBER_ADDRESS)}>주소</BadgeLabel>
        <SearchInputField
          {...register(FIELD.MEMBER_ADDRESS)}
          placeholder="주소를 입력해주세요"
          readOnly
        />
        <TextInput
          {...register(FIELD.MEMBER_ADDRESS_DETAIL)}
          placeholder="상세주소를 입력해주세요"
          readOnly
        />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.MEMBER_PHONE)}>연락처</BadgeLabel>
        <TextInput {...register(FIELD.MEMBER_PHONE)} placeholder="연락처를 입력해주세요" readOnly />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.EMERGENCY_NUMBER)}>비상 연락처</BadgeLabel>
        <TextInput
          {...register(FIELD.EMERGENCY_NUMBER)}
          placeholder="비상 연락처를 입력해주세요"
          readOnly
        />
      </Card>
    </>
  );
}
