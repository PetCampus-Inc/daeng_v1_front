import { useFormContext } from "react-hook-form";

import Title from "components/common/Title";
import InputField from "components/common/InputField";
import SingleRadio from "components/common/Select/SingleRadio";
import SearchInputField from "components/common/InputField/SearchInputField";

import { ITEM_KEYS } from "constants/item";
import { Card } from "../styles";
interface MemberInfoProps {
  requiredItems?: Map<number, boolean>;
}

const MemberInfo = ({ requiredItems }: MemberInfoProps) => {
  const { control } = useFormContext();

  return (
    <>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.MEMBER_NAME)}>이름</Title>
        <InputField
          control={control}
          name="memberName"
          placeholder="견주 이름을 입력해주세요"
          disabled
        />
      </Card>
      <Card>
        <Title>성별</Title>
        <SingleRadio name="memberGender" radiosText={["남", "여"]} />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.MEMBER_ADDRESS)}>주소</Title>
        <SearchInputField
          control={control}
          name="addressStreet"
          placeholder="주소를 입력해주세요"
          disabled
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.MEMBER_PHONE)}>연락처</Title>
        <InputField
          control={control}
          name="phoneNumber"
          placeholder="연락처를 입력해주세요"
          disabled
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.EMERGENCY_NUMBER)}>비상 연락처</Title>
        <InputField
          control={control}
          name="emergencyNumber"
          placeholder="비상 연락처를 입력해주세요"
          disabled
        />
      </Card>
    </>
  );
};

export default MemberInfo;
