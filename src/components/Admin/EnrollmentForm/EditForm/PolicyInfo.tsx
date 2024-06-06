import { FIELD_KEYS } from "constants/field";

import { Checkbox } from "components/common";
import TextArea from "components/common/TextArea";
import AdminTitle from "components/common/Title/AdminTitle";
import { useFormContext } from "react-hook-form";

import { Card, Stack } from "../styles";

const PolicyInfo = () => {
  const { register, control } = useFormContext();

  return (
    <>
      <Card>
        <AdminTitle name={`requiredItemList.${FIELD_KEYS.LIMITS_INFO}`} control={control} hasBadge>
          이용 제한 유의 사항
        </AdminTitle>
        <TextArea
          {...register("limitsInfo", { required: true })}
          placeholder="이용 제한 관련 유의사항을 입력해 주세요"
        />
        <Stack>
          <Checkbox label="동의합니다" disabled />
        </Stack>
      </Card>
      <Card>
        <AdminTitle
          name={`requiredItemList.${FIELD_KEYS.ACCIDENT_INFO}`}
          control={control}
          hasBadge
        >
          상해 유의사항
        </AdminTitle>
        <TextArea
          {...register("accidentInfo", { required: true })}
          placeholder="상해 관련 유의사항을 입력해 주세요"
        />
        <Stack>
          <Checkbox label="동의합니다" disabled />
        </Stack>
      </Card>
      <Card>
        <AdminTitle
          name={`requiredItemList.${FIELD_KEYS.ABANDONMENT_INFO}`}
          control={control}
          hasBadge
        >
          유기 유의사항
        </AdminTitle>
        <TextArea
          {...register("abandonmentInfo", { required: true })}
          placeholder="유기 관련 유의사항을 입력해 주세요"
        />
        <Stack>
          <Checkbox label="동의합니다" disabled />
        </Stack>
      </Card>
    </>
  );
};

export default PolicyInfo;
