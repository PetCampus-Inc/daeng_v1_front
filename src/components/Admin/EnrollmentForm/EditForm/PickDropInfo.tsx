import { FIELD, FIELD_KEYS } from "constants/field";

import { Checkbox, ToggleLabel } from "components/common";
import SingleRadio from "components/common/Select/SingleRadio";
import { Textarea } from "components/common/Textarea";
import { useEffect } from "react";
import { Controller, Form, useFormContext } from "react-hook-form";

import { Card, Caption, Stack } from "../styles";

export function PickDropInfo() {
  const { register, control, watch, unregister } = useFormContext();
  const pickDropState = watch(FIELD.PICKDROP_STATE);

  useEffect(() => {
    if (pickDropState === "미운영") {
      unregister(FIELD.PICKDROP_NOTICE);
      unregister(`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.PICKDROP_REQUEST}`);
      unregister(`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.PICKDROP_TYPE}`);
      unregister(`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.PICKDROP_MEMO}`);
      unregister(`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.PICKDROP_INFO}`);
      unregister(FIELD.PICKDROP_INFO);
    }
  }, [pickDropState]);

  return (
    <Form control={control}>
      <Card>
        <ToggleLabel showBadge>픽드랍 운영</ToggleLabel>
        <SingleRadio name="pickDropState" radiosText={["운영", "미운영"]} isRequired />
      </Card>
      {pickDropState === "운영" && (
        <>
          <Card>
            <ToggleLabel showBadge>픽드랍 안내</ToggleLabel>
            <Caption>견주에게 안내할 픽드랍 내용을 입력해 주세요</Caption>
            <Textarea
              {...register(FIELD.PICKDROP_NOTICE, { required: true })}
              placeholder="ex) 픽드랍 왕복 50000 추가금 10000"
            />
          </Card>
          <Card>
            <Controller
              name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.PICKDROP_REQUEST}`}
              render={({ field }) => (
                <ToggleLabel showToggle {...field}>
                  픽드랍 신청
                </ToggleLabel>
              )}
            />
            <SingleRadio name="null" radiosText={["신청", "미신청"]} disabled />
          </Card>
          <Card>
            <Controller
              name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.PICKDROP_TYPE}`}
              render={({ field }) => (
                <ToggleLabel showToggle {...field}>
                  픽드랍 유형
                </ToggleLabel>
              )}
            />
            <SingleRadio name="null" radiosText={["편도", "왕복"]} disabled />
          </Card>
          <Card>
            <Controller
              name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.PICKDROP_MEMO}`}
              render={({ field }) => (
                <ToggleLabel showToggle {...field}>
                  픽드랍 메모
                </ToggleLabel>
              )}
            />
            <Textarea
              placeholder="견주가 원하는 픽드랍 장소나 시간에 대해 입력하는 칸이에요"
              disabled
            />
          </Card>
          <Card>
            <Controller
              name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.PICKDROP_INFO}`}
              render={({ field }) => (
                <ToggleLabel showBadge showToggle {...field}>
                  픽드랍 유의사항
                </ToggleLabel>
              )}
            />
            <Textarea
              {...register(FIELD.PICKDROP_INFO, { required: true })}
              placeholder="픽드랍 유의사항을 입력해 주세요"
            />
            <Stack>
              <Checkbox label="동의합니다" disabled />
            </Stack>
          </Card>
        </>
      )}
    </Form>
  );
}
