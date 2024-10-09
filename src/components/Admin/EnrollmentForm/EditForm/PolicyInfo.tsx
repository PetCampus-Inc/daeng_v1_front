import { FIELD, FIELD_KEYS } from "constants/field";

import { Checkbox, ToggleLabel } from "components/common";
import { Textarea } from "components/common/Textarea";
import { Controller, useFormContext } from "react-hook-form";

import { Card, Stack } from "../styles";

export function PolicyInfo() {
  const { register, control } = useFormContext();

  return (
    <>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.LIMITS_INFO}`}
          control={control}
          render={({ field }) => (
            <ToggleLabel showBadge showToggle {...field}>
              이용 제한 유의 사항
            </ToggleLabel>
          )}
        />
        <Textarea
          {...register(FIELD.LIMITS_INFO, { required: true })}
          placeholder="이용 제한 관련 유의사항을 입력해 주세요"
        />
        <Stack>
          <Checkbox label="동의합니다" disabled />
        </Stack>
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.ACCIDENT_INFO}`}
          control={control}
          render={({ field }) => (
            <ToggleLabel showBadge showToggle {...field}>
              상해 유의사항
            </ToggleLabel>
          )}
        />
        <Textarea
          {...register(FIELD.ACCIDENT_INFO, { required: true })}
          placeholder="상해 관련 유의사항을 입력해 주세요"
        />
        <Stack>
          <Checkbox label="동의합니다" disabled />
        </Stack>
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.ABANDONMENT_INFO}`}
          control={control}
          render={({ field }) => (
            <ToggleLabel showBadge showToggle {...field}>
              유기 유의사항
            </ToggleLabel>
          )}
        />
        <Textarea
          {...register(FIELD.ABANDONMENT_INFO, { required: true })}
          placeholder="유기 관련 유의사항을 입력해 주세요"
        />
        <Stack>
          <Checkbox label="동의합니다" disabled />
        </Stack>
      </Card>
    </>
  );
}
