import { FIELD, FIELD_KEYS } from "constants/field";

import { TextInput } from "components/common";
import SearchInputField from "components/common/Input/SearchInputField";
import SingleRadio from "components/common/Select/SingleRadio";
import Title from "components/common/Title";

import { Card } from "../styles";
interface MemberInfoProps {
  item?: Map<number, boolean>;
}

const MemberInfo = ({ item }: MemberInfoProps) => {
  return (
    <>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.MEMBER_NAME)}>이름</Title>
        <TextInput name={FIELD.MEMBER_NAME} placeholder="견주 이름을 입력해주세요" readOnly />
      </Card>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.MEMBER_GENDER)}>성별</Title>
        <SingleRadio name={FIELD.MEMBER_GENDER} radiosText={["남", "여"]} isPreviewMode disabled />
      </Card>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.MEMBER_ADDRESS)}>주소</Title>
        <SearchInputField name={FIELD.MEMBER_ADDRESS} placeholder="주소를 입력해주세요" readOnly />
      </Card>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.MEMBER_PHONE)}>연락처</Title>
        <TextInput name={FIELD.MEMBER_PHONE} placeholder="연락처를 입력해주세요" readOnly />
      </Card>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.EMERGENCY_NUMBER)}>비상 연락처</Title>
        <TextInput
          name={FIELD.EMERGENCY_NUMBER}
          placeholder="비상 연락처를 입력해주세요"
          readOnly
        />
      </Card>
    </>
  );
};

export default MemberInfo;
