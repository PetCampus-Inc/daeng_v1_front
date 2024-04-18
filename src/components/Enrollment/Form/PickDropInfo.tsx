import { ITEM_KEYS } from "constants/item";

import Checkbox from "components/common/Checkbox";
import SingleRadio from "components/common/Select/SingleRadio";
import { Caption } from "components/common/Select/styles";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { Label } from "components/common/Title/style";
import { Controller, useFormContext } from "react-hook-form";

import { Card, Stack } from "./styles";

import type { IPickDropInfo } from "types/School.type";

interface PickDropInfoProps {
  info: IPickDropInfo;
  requiredItems: Map<number, boolean>;
}

const PickDropInfo = ({ info, requiredItems }: PickDropInfoProps) => {
  const { register, control, watch } = useFormContext();
  return (
    <>
      <Card>
        <Label>픽드랍 안내</Label>
        <TextArea defaultValue={info.pickDropNotice} disabled />
      </Card>
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.PICKDROP_REQUEST)}>픽드랍 신청</Title>
        <SingleRadio
          name="pickDropRequest"
          radiosText={["신청", "미신청"]}
          isRequired={requiredItems.get(ITEM_KEYS.PICKDROP_REQUEST)}
        />
      </Card>
      {watch("pickDropRequest") === "신청" && (
        <>
          <Card>
            <Title isRequired={requiredItems.get(ITEM_KEYS.PICKDROP_TYPE)}>픽드랍 유형</Title>
            <SingleRadio
              name="pickDropType"
              radiosText={["편도", "왕복"]}
              isRequired={requiredItems.get(ITEM_KEYS.PICKDROP_TYPE)}
            />
          </Card>
          <Card>
            <Title isRequired={requiredItems.get(ITEM_KEYS.PICKDROP_MEMO)}>픽드랍 메모</Title>
            <TextArea
              {...register("pickDropMemoField", {
                required: requiredItems.get(ITEM_KEYS.PICKDROP_MEMO)
              })}
              placeholder="픽드랍 장소, 시간에 대해 자세히 적어주세요."
            />
          </Card>
          <Card>
            <Title isRequired={requiredItems.get(ITEM_KEYS.PICKDROP_INFO)}>픽드랍 유의사항</Title>
            <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
            <TextArea defaultValue={info.pickDropInfo} isChecked={watch("pickDropInfo")} disabled />
            <Stack>
              <Controller
                name="pickDropInfo"
                control={control}
                rules={{ required: requiredItems.get(ITEM_KEYS.ABANDONMENT_INFO) }}
                render={({ field: { ref, ...field } }) => (
                  <Checkbox
                    label="동의합니다"
                    ref={ref}
                    isChecked={field.value}
                    onChange={field.onChange}
                  />
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