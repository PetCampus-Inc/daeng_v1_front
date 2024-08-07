import { type AgreementsListType, FIELD_KEYS, FIELD } from "constants/field";

import { Checkbox } from "components/common";
import SingleRadio from "components/common/Select/SingleRadio";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { useFormContext } from "react-hook-form";

import { Caption, Card, Label, Stack } from "../styles";

interface PickDropInfoProps {
  item?: Map<number, boolean>;
  agreements: AgreementsListType;
}
const PickDropInfo = ({ item, agreements }: PickDropInfoProps) => {
  const { register, watch } = useFormContext();

  console.log(watch("pickDropRequest"));

  return (
    <>
      <Card>
        <Label>픽드랍 안내</Label>
        <TextArea {...register(FIELD.PICKDROP_NOTICE)} disabled />
      </Card>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.PICKDROP_REQUEST)}>픽드랍 신청</Title>
        <SingleRadio name={FIELD.PICKDROP_REQUEST} radiosText={["신청", "미신청"]} />
      </Card>
      {watch("pickDropRequest") === "신청" && (
        <>
          <Card>
            <Title isRequired={item?.get(FIELD_KEYS.PICKDROP_TYPE)}>픽드랍 유형</Title>
            <SingleRadio
              name={FIELD.PICKDROP_TYPE}
              radiosText={["편도", "왕복"]}
              isPreviewMode
              disabled
            />
          </Card>
          <Card>
            <Title isRequired={item?.get(FIELD_KEYS.PICKDROP_MEMO)}>픽드랍 메모</Title>
            <TextArea
              {...register(FIELD.PICKDROP_MEMO)}
              placeholder="픽드랍 장소, 시간에 대해 자세히 적어주세요."
              readOnly
            />
          </Card>
          <Card>
            <Title isRequired={item?.get(FIELD_KEYS.PICKDROP_INFO)}>픽드랍 유의사항</Title>
            <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
            <TextArea
              {...register(FIELD.PICKDROP_INFO)}
              isChecked={agreements[FIELD.PICKDROP_INFO_TERM]}
              disabled
            />
            <Stack>
              <Checkbox
                label="동의합니다"
                isChecked={agreements[FIELD.PICKDROP_INFO_TERM]}
                readOnly
              />
            </Stack>
          </Card>
        </>
      )}
    </>
  );
};

export default PickDropInfo;
