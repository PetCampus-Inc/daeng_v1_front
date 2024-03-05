import { ITEM_KEYS } from "constants/item";

import Checkbox from "components/common/Checkbox";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";

import { Caption, Card, Stack } from "../styles";

interface PolicyInfoProps {
  item?: Map<number, boolean>;
}

const PolicyInfo = ({ item }: PolicyInfoProps) => {
  const { register } = useFormContext();
  return (
    <>
      <Card>
        <Checkbox label="유의사항 전체 동의하기" variant="fill" readOnly />
      </Card>
      <Card>
        <Title htmlFor="limitsInfo" isRequired={item?.get(ITEM_KEYS.LIMITS_INFO)}>
          이용 제한 유의 사항
        </Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <TextArea {...register("limitsInfo")} disabled />
        <Stack>
          <Checkbox label="동의합니다" readOnly />
        </Stack>
      </Card>
      <Card>
        <Title htmlFor="accidentInfo" isRequired={item?.get(ITEM_KEYS.ACCIDENT_INFO)}>
          상해 유의사항
        </Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <TextArea {...register("accidentInfo")} disabled />
        <Stack>
          <Checkbox label="동의합니다" readOnly />
        </Stack>
      </Card>
      <Card>
        <Title htmlFor="abandonmentInfo" isRequired={item?.get(ITEM_KEYS.ABANDONMENT_INFO)}>
          유기 유의사항
        </Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <TextArea {...register("abandonmentInfo")} disabled />
        <Stack>
          <Checkbox label="동의합니다" readOnly />
        </Stack>
      </Card>
    </>
  );
};

export default PolicyInfo;
