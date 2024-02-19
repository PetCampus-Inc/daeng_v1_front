import Title from "components/common/Title";
import { Card, Stack } from "./styles";
import SingleRadio from "components/common/Select/SingleRadio";
import TextArea from "components/common/TextArea";
import { useFormContext } from "react-hook-form";
import { Caption } from "components/common/Select/styles";
import type { IPickDropInfo } from "types/School.type";
import { ITEM_KEYS } from "constants/item";
import Checkbox from "components/common/Checkbox";
import { Label } from "components/common/Title/style";
interface PickDropInfoProps {
  info: IPickDropInfo;
  requiredItems: Map<number, boolean>;
}

const PickDropInfo = ({ info, requiredItems }: PickDropInfoProps) => {
  const { control, watch } = useFormContext();
  return (
    <>
      <Card>
        <Label>픽드랍 안내</Label>
        <TextArea name="pickDropNoticeField" defaultValue={info.pickDropNotice} disabled />
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
              name="pickDropMemoField"
              placeholder="픽드랍 장소, 시간에 대해 자세히 적어주세요."
              isRequired={requiredItems.get(ITEM_KEYS.PICKDROP_MEMO)}
            />
          </Card>
          <Card>
            <Title isRequired={requiredItems.get(ITEM_KEYS.PICKDROP_INFO)}>픽드랍 유의사항</Title>
            <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
            <TextArea
              name="pickDropInfoField"
              defaultValue={info.pickDropInfo}
              isChecked={watch("pickDropInfo")}
              disabled
            />
            <Stack>
              <Checkbox
                name="pickDropInfo"
                control={control}
                ariaLabel="동의"
                isChecked={watch("pickDropInfo")}
                isRequired={requiredItems.get(ITEM_KEYS.ABANDONMENT_INFO)}
              >
                동의합니다
              </Checkbox>
            </Stack>
          </Card>
        </>
      )}
    </>
  );
};

export default PickDropInfo;
