import { FIELD_KEYS } from "constants/field";

import { TextInput } from "components/common";
import SearchInputField from "components/common/Input/SearchInputField";
import SingleRadio from "components/common/Select/SingleRadio";
import AdminTitle from "components/common/Title/AdminTitle";
import { useFormContext } from "react-hook-form";

import { Card } from "../styles";

const MemberInfo = () => {
  const { control } = useFormContext();

  return (
    <>
      <Card>
        <AdminTitle name={`requiredItemList.${FIELD_KEYS.MEMBER_NAME}`} control={control}>
          이름
        </AdminTitle>
        <TextInput name="null" placeholder="견주 이름을 입력하는 칸이에요" disabled />
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${FIELD_KEYS.MEMBER_GENDER}`} control={control}>
          성별
        </AdminTitle>
        <SingleRadio name="null" radiosText={["남", "여"]} disabled />
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${FIELD_KEYS.MEMBER_ADDRESS}`} control={control}>
          주소
        </AdminTitle>
        <SearchInputField name="null" placeholder="주소를 입력하는 칸이에요" disabled />
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${FIELD_KEYS.MEMBER_PHONE}`} control={control}>
          연락처
        </AdminTitle>
        <TextInput name="null" placeholder="견주가 연락처를 입력하는 칸이에요" disabled />
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${FIELD_KEYS.EMERGENCY_NUMBER}`} control={control}>
          비상 연락처
        </AdminTitle>
        <TextInput name="null" placeholder="견주가 비상연락처를 입력하는 칸이에요" disabled />
      </Card>
    </>
  );
};

export default MemberInfo;
