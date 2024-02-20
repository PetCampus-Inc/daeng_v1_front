import Title from "components/common/Title";
import InputField from "components/common/InputField";
import SingleRadio from "components/common/Select/SingleRadio";
import SearchInputField from "components/common/InputField/SearchInputField";

import { ITEM_KEYS } from "constants/item";
import { Card } from "../styles";
interface MemberInfoProps {
  item?: Map<number, boolean>;
}

const MemberInfo = ({ item }: MemberInfoProps) => {
  return (
    <>
      <Card>
        <Title isRequired={item?.get(ITEM_KEYS.MEMBER_NAME)}>이름</Title>
        <InputField name="memberName" placeholder="견주 이름을 입력해주세요" readOnly />
      </Card>
      <Card>
        <Title isRequired={item?.get(ITEM_KEYS.MEMBER_GENDER)}>성별</Title>
        {/* FIXME: disabled 상태와 readonly 상태 구분이 필요해 보임..!*/}
        <SingleRadio name="memberGender" radiosText={["남", "여"]} disabled />
      </Card>
      <Card>
        <Title isRequired={item?.get(ITEM_KEYS.MEMBER_ADDRESS)}>주소</Title>
        <SearchInputField name="addressStreet" placeholder="주소를 입력해주세요" readOnly />
      </Card>
      <Card>
        <Title isRequired={item?.get(ITEM_KEYS.MEMBER_PHONE)}>연락처</Title>
        <InputField name="phoneNumber" placeholder="연락처를 입력해주세요" readOnly />
      </Card>
      <Card>
        <Title isRequired={item?.get(ITEM_KEYS.EMERGENCY_NUMBER)}>비상 연락처</Title>
        <InputField name="emergencyNumber" placeholder="비상 연락처를 입력해주세요" readOnly />
      </Card>
    </>
  );
};

export default MemberInfo;
