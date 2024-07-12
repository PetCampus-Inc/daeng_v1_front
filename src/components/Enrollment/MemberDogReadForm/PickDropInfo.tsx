import { FIELD, FIELD_KEYS } from "constants/field";
import { REQUIRED_ITEMS_DOG_MAP } from "constants/requiredItemsMap";

import { Checkbox } from "components/common";
import SingleRadio from "components/common/Select/SingleRadio";
import { Caption } from "components/common/Select/styles";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { Label } from "components/common/Title/style";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { handlePreventDefault } from "utils/preventDefault";

import { Card, Stack } from "./styles";

const PickDropInfo = () => {
  const { register, control, watch, setValue } = useFormContext();
  const pickDropRequest = watch(FIELD.PICKDROP_REQUEST);

  useEffect(() => {
    setValue(FIELD.PICKDROP_INFO_TERM, true);
  }, [setValue]);

  useEffect(() => {
    // 강제로 신청 버튼 되도록
    if (pickDropRequest === "미신청") {
      setValue(FIELD.PICKDROP_REQUEST, "신청");
    }
  }, [pickDropRequest, setValue, watch]);

  return (
    <>
      <Card>
        <Label>픽드랍 안내</Label>
        <TextArea {...register(FIELD.PICKDROP_NOTICE)} disabled />
      </Card>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.PICKDROP_REQUEST)}>
          픽드랍 신청
        </Title>
        <SingleRadio
          name={FIELD.PICKDROP_REQUEST}
          radiosText={["신청", "미신청"]}
          isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.PICKDROP_REQUEST)}
          defaultSelect={pickDropRequest === "REQUEST" ? "신청" : "미신청"}
          preventDefaultClick={handlePreventDefault}
        />
      </Card>
      {pickDropRequest === "신청" && (
        <>
          <Card>
            <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.PICKDROP_TYPE)}>
              픽드랍 유형
            </Title>
            <SingleRadio
              name={FIELD.PICKDROP_TYPE}
              radiosText={["편도", "왕복"]}
              isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.PICKDROP_TYPE)}
              defaultSelect={watch(FIELD.PICKDROP_TYPE) === "ONE_WAY" ? "편도" : "왕복"}
              preventDefaultClick={handlePreventDefault}
            />
          </Card>
          <Card>
            <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.PICKDROP_MEMO)}>
              픽드랍 메모
            </Title>
            <TextArea
              {...register(FIELD.PICKDROP_MEMO, {
                required: REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.PICKDROP_MEMO)
              })}
              placeholder="픽드랍 장소, 시간에 대해 자세히 적어주세요."
              readOnly
            />
          </Card>
          <Card>
            <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.PICKDROP_INFO)}>
              픽드랍 유의사항
            </Title>
            <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
            <TextArea
              {...register(FIELD.PICKDROP_INFO)}
              isChecked={watch(FIELD.PICKDROP_INFO_TERM)}
              disabled
            />
            <Stack>
              <Controller
                name={FIELD.PICKDROP_INFO_TERM}
                control={control}
                rules={{ required: REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.ABANDONMENT_INFO) }}
                render={({ field: { ref, ...field } }) => (
                  <Checkbox label="동의합니다" ref={ref} isChecked={field.value} />
                )}
              />
            </Stack>
          </Card>
        </>
      )}
    </>
  );
};

export default PickDropInfo;
