import { FIELD, FIELD_KEYS } from "constants/field";

import { Checkbox, ToggleLabel } from "components/common";
import { Textarea } from "components/common/Textarea";
import { Controller, useFormContext } from "react-hook-form";

import { Card, Stack } from "../styles";
import { useEffect } from "react";

const logFocusBlur = (fieldName: string, eventType: "focus" | "blur") => {
  console.log(`${eventType} event on ${fieldName} at ${new Date().toISOString()}`);
};

export function PolicyInfo() {
  const { register } = useFormContext();

  useEffect(() => {
    console.log("PolicyInfo component mounted");
    return () => {
      console.log("PolicyInfo component will unmount");
    };
  }, []);

  return (
    <>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.LIMITS_INFO}`}
          defaultValue={true}
          render={({ field }) => (
            <ToggleLabel showBadge showToggle {...field}>
              이용 제한 유의 사항
            </ToggleLabel>
          )}
        />
        <Textarea
          {...register(FIELD.LIMITS_INFO, { required: true })}
          placeholder="이용 제한 관련 유의사항을 입력해 주세요"
          onFocus={() => logFocusBlur(FIELD.LIMITS_INFO, "focus")}
          onBlur={() => logFocusBlur(FIELD.LIMITS_INFO, "blur")}
        />
        <Stack>
          <Checkbox label="동의합니다" disabled />
        </Stack>
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.ACCIDENT_INFO}`}
          defaultValue={true}
          render={({ field }) => (
            <ToggleLabel showBadge showToggle {...field}>
              상해 유의사항
            </ToggleLabel>
          )}
        />
        <Textarea
          {...register(FIELD.ACCIDENT_INFO, { required: true })}
          placeholder="상해 관련 유의사항을 입력해 주세요"
          onFocus={() => logFocusBlur(FIELD.LIMITS_INFO, "focus")}
          onBlur={() => logFocusBlur(FIELD.LIMITS_INFO, "blur")}
        />
        <Stack>
          <Checkbox label="동의합니다" disabled />
        </Stack>
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.ABANDONMENT_INFO}`}
          defaultValue={true}
          render={({ field }) => (
            <ToggleLabel showBadge showToggle {...field}>
              유기 유의사항
            </ToggleLabel>
          )}
        />
        <Textarea
          {...register(FIELD.ABANDONMENT_INFO, { required: true })}
          placeholder="유기 관련 유의사항을 입력해 주세요"
          onFocus={() => logFocusBlur(FIELD.LIMITS_INFO, "focus")}
          onBlur={() => logFocusBlur(FIELD.LIMITS_INFO, "blur")}
        />
        <Stack>
          <Checkbox label="동의합니다" disabled />
        </Stack>
      </Card>
    </>
  );
}
