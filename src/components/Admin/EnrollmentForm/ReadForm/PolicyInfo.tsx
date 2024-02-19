import Checkbox from "components/common/Checkbox";
import Title from "components/common/Title";
import TextArea from "components/common/TextArea";

import type { IPolicyInfo } from "types/School.type";
import { ITEM_KEYS } from "constants/item";
import { Caption, Card, Stack } from "../styles";

interface PolicyInfoProps {
  info?: IPolicyInfo;
  requiredItems?: Map<number, boolean>;
}

const PolicyInfo = ({ info, requiredItems }: PolicyInfoProps) => {
  return (
    <>
      <Card>
        <Checkbox name="all" variant="square" readOnly>
          유의사항 전체 동의하기
        </Checkbox>
      </Card>
      <Card>
        <Title htmlFor="limitsInfo" isRequired={requiredItems?.get(ITEM_KEYS.LIMITS_INFO)}>
          이용 제한 유의 사항
        </Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <TextArea name="limitsInfoField" defaultValue={info?.limitsInfo} disabled />
        <Stack>
          <Checkbox name="limitsInfo" readOnly>
            동의합니다
          </Checkbox>
        </Stack>
      </Card>
      <Card>
        <Title htmlFor="accidentInfo" isRequired={requiredItems?.get(ITEM_KEYS.ACCIDENT_INFO)}>
          상해 유의사항
        </Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <TextArea name="accidentInfoField" defaultValue={info?.accidentInfo} disabled />
        <Stack>
          <Checkbox name="accidentInfo" ariaLabel="동의" readOnly>
            동의합니다
          </Checkbox>
        </Stack>
      </Card>
      <Card>
        <Title
          htmlFor="abandonmentInfo"
          isRequired={requiredItems?.get(ITEM_KEYS.ABANDONMENT_INFO)}
        >
          유기 유의사항
        </Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <TextArea name="abandonmentInfoField" defaultValue={info?.abandonmentInfo} disabled />
        <Stack>
          <Checkbox name="abandonmentInfo" ariaLabel="동의" readOnly>
            동의합니다
          </Checkbox>
        </Stack>
      </Card>
    </>
  );
};

export default PolicyInfo;
