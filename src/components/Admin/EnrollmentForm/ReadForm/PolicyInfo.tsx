import { FIELD, FIELD_KEYS } from "constants/field";

import { BadgeLabel, Checkbox } from "components/common";
import { Textarea } from "components/common/Textarea";
import { useFormContext } from "react-hook-form";

import { Caption, Card, Stack } from "../styles";

interface PolicyInfoProps {
  item?: Map<number, boolean>;
}

export function PolicyInfo({ item }: PolicyInfoProps) {
  const { register } = useFormContext();
  return (
    <>
      <Card>
        <Checkbox label="유의사항 전체 동의하기" variant="fill" readOnly />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.LIMITS_INFO)}>이용 제한 유의 사항</BadgeLabel>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <Textarea {...register(FIELD.LIMITS_INFO)} disabled />
        <Stack>
          <Checkbox label="동의합니다" readOnly />
        </Stack>
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.ACCIDENT_INFO)}>상해 유의사항</BadgeLabel>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <Textarea {...register(FIELD.ACCIDENT_INFO)} disabled />
        <Stack>
          <Checkbox label="동의합니다" readOnly />
        </Stack>
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.ABANDONMENT_INFO)}>유기 유의사항</BadgeLabel>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <Textarea {...register(FIELD.ABANDONMENT_INFO)} disabled />
        <Stack>
          <Checkbox label="동의합니다" readOnly />
        </Stack>
      </Card>
    </>
  );
}
