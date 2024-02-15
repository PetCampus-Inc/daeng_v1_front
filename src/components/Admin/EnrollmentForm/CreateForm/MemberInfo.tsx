import { useFormContext } from "react-hook-form";

import AdminTitle from "components/common/Title/AdminTitle";
import InputField from "components/common/InputField";
import SingleRadio from "components/common/Select/SingleRadio";
import SearchInputField from "components/common/InputField/SearchInputField";

import { Card } from "../styles";

const MemberInfo = () => {
  const { control } = useFormContext();

  return (
    <>
      <Card>
        <AdminTitle name="name" control={control}>
          이름
        </AdminTitle>
        <InputField
          name="nameField"
          control={control}
          placeholder="견주 이름을 입력하는 칸이에요"
          disabled
        />
      </Card>
      <Card>
        <AdminTitle name="memberGender" control={control}>
          성별
        </AdminTitle>
        <SingleRadio name="memberGenderField" radiosText={["남", "여"]} disabled />
      </Card>
      <Card>
        <AdminTitle name="address" control={control}>
          주소
        </AdminTitle>
        <SearchInputField
          name="addressField"
          control={control}
          placeholder="주소를 입력하는 칸이에요"
          disabled
        />
      </Card>
      <Card>
        <AdminTitle name="phoneNumber" control={control}>
          연락처
        </AdminTitle>
        <InputField
          name="phoneNumberField"
          control={control}
          placeholder="견주가 연락처를 입력하는 칸이에요"
          disabled
        />
      </Card>
      <Card>
        <AdminTitle name="emergencyNumber" control={control}>
          비상 연락처
        </AdminTitle>
        <InputField
          name="emergencyNumberField"
          control={control}
          placeholder="견주가 비상연락처를 입력하는 칸이에요"
          disabled
        />
      </Card>
    </>
  );
};

export default MemberInfo;
