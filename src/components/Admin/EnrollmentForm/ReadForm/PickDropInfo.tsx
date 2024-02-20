import { useFormContext } from "react-hook-form";

import { ITEM_KEYS } from "constants/item";
import { Caption, Card, Label, Stack } from "../styles";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import SingleRadio from "components/common/Select/SingleRadio";
import Checkbox from "components/common/Checkbox";

interface PickDropInfoProps {
  item?: Map<number, boolean>;
}
const PickDropInfo = ({ item }: PickDropInfoProps) => {
  const { watch } = useFormContext();

  console.log(watch("pickDropRequest"));

  return (
    <>
      <Card>
        <Label>픽드랍 안내</Label>
        <TextArea name="pickDropNotice" disabled />
      </Card>
      <Card>
        <Title isRequired={item?.get(ITEM_KEYS.PICKDROP_REQUEST)}>픽드랍 신청</Title>
        <SingleRadio name="pickDropRequest" radiosText={["신청", "미신청"]} />
      </Card>
      {watch("pickDropRequest") === "신청" && (
        <>
          <Card>
            <Title isRequired={item?.get(ITEM_KEYS.PICKDROP_TYPE)}>픽드랍 유형</Title>
            <SingleRadio name="pickDropType" radiosText={["편도", "왕복"]} />
          </Card>
          <Card>
            <Title isRequired={item?.get(ITEM_KEYS.PICKDROP_MEMO)}>픽드랍 메모</Title>
            <TextArea
              name="pickDropMemo"
              placeholder="픽드랍 장소, 시간에 대해 자세히 적어주세요."
              readOnly
            />
          </Card>
          <Card>
            <Title isRequired={item?.get(ITEM_KEYS.PICKDROP_INFO)}>픽드랍 유의사항</Title>
            <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
            <TextArea name="pickDropInfo" disabled />
            <Stack>
              <Checkbox name="null" ariaLabel="동의" readOnly>
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
