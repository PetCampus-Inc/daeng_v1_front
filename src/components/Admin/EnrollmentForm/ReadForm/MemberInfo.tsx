import { FIELD, FIELD_KEYS } from "constants/field";

import { BadgeLabel, TextInput } from "components/common";
import SearchInputField from "components/common/Input/SearchInputField";
import SingleRadio from "components/common/Select/SingleRadio";

import { Card } from "../styles";
interface MemberInfoProps {
  item?: Map<number, boolean>;
}

export function MemberInfo({ item }: MemberInfoProps) {
  return (
    <>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.MEMBER_NAME)}>이름</BadgeLabel>
        <TextInput name={FIELD.MEMBER_NAME} placeholder="견주 이름을 입력해주세요" readOnly />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.MEMBER_GENDER)}>성별</BadgeLabel>
        <SingleRadio name={FIELD.MEMBER_GENDER} radiosText={["남", "여"]} isPreviewMode disabled />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.MEMBER_ADDRESS)}>주소</BadgeLabel>
        <SearchInputField name={FIELD.MEMBER_ADDRESS} placeholder="주소를 입력해주세요" readOnly />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.MEMBER_PHONE)}>연락처</BadgeLabel>
        <TextInput name={FIELD.MEMBER_PHONE} placeholder="연락처를 입력해주세요" readOnly />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.EMERGENCY_NUMBER)}>비상 연락처</BadgeLabel>
        <TextInput
          name={FIELD.EMERGENCY_NUMBER}
          placeholder="비상 연락처를 입력해주세요"
          readOnly
        />
      </Card>
    </>
  );
}
