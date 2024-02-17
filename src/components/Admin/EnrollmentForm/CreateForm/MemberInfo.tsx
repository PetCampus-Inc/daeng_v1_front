import { useFormContext } from "react-hook-form";

import AdminTitle from "components/common/Title/AdminTitle";
import InputField from "components/common/InputField";
import SingleRadio from "components/common/Select/SingleRadio";
import SearchInputField from "components/common/InputField/SearchInputField";

import { Card } from "../styles";
import { ITEM_KEYS } from "constants/item";
import { useEffect } from "react";

const MemberInfo = () => {
  const { control, setValue } = useFormContext();

  const REQUIRED_ITEMS = [
    `requiredItemList.${ITEM_KEYS.MEMBER_NAME}`,
    `requiredItemList.${ITEM_KEYS.MEMBER_ADDRESS}`,
    `requiredItemList.${ITEM_KEYS.MEMBER_PHONE}`
  ];

  useEffect(() => {
    REQUIRED_ITEMS.forEach((fieldName) => {
      setValue(fieldName, true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card>
        <AdminTitle name={REQUIRED_ITEMS[0]} control={control} readOnly>
          이름
        </AdminTitle>
        <InputField
          name="null"
          control={control}
          placeholder="견주 이름을 입력하는 칸이에요"
          disabled
        />
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.MEMBER_GENDER}`} control={control}>
          성별
        </AdminTitle>
        <SingleRadio name="null" radiosText={["남", "여"]} disabled />
      </Card>
      <Card>
        <AdminTitle name={REQUIRED_ITEMS[1]} control={control} readOnly>
          주소
        </AdminTitle>
        <SearchInputField
          name="null"
          control={control}
          placeholder="주소를 입력하는 칸이에요"
          disabled
        />
      </Card>
      <Card>
        <AdminTitle name={REQUIRED_ITEMS[2]} control={control} readOnly>
          연락처
        </AdminTitle>
        <InputField
          name="null"
          control={control}
          placeholder="견주가 연락처를 입력하는 칸이에요"
          disabled
        />
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.EMERGENCY_NUMBER}`} control={control}>
          비상 연락처
        </AdminTitle>
        <InputField
          name="null"
          control={control}
          placeholder="견주가 비상연락처를 입력하는 칸이에요"
          disabled
        />
      </Card>
    </>
  );
};

export default MemberInfo;
