import { type AgreementsListType, FIELD_KEYS, FIELD } from "constants/field";

import { BadgeLabel, Checkbox } from "components/common";
import { Textarea } from "components/common/Textarea";
import { useFormContext } from "react-hook-form";

import { Caption, Card, Stack } from "../styles";

interface PolicyInfoProps {
  item?: Map<number, boolean>;
  agreements: AgreementsListType;
}

export function PolicyInfo({ item, agreements }: PolicyInfoProps) {
  const { register } = useFormContext();

  const isAllChecked =
    agreements[FIELD.LIMITS_INFO_TERM] &&
    agreements[FIELD.ACCIDENT_INFO_TERM] &&
    agreements[FIELD.ABANDONMENT_INFO_TERM];

  return (
    <>
      <Card>
        <Checkbox label="유의사항 전체 동의하기" isChecked={isAllChecked} variant="fill" readOnly />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.LIMITS_INFO)}>이용 제한 유의 사항</BadgeLabel>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <Textarea
          {...register(FIELD.LIMITS_INFO)}
          isChecked={agreements[FIELD.LIMITS_INFO_TERM]}
          disabled
        />
        <Stack>
          <Checkbox label="동의합니다" isChecked={agreements[FIELD.LIMITS_INFO_TERM]} readOnly />
        </Stack>
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.ACCIDENT_INFO)}>상해 유의사항</BadgeLabel>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <Textarea
          {...register(FIELD.ACCIDENT_INFO)}
          isChecked={agreements[FIELD.ACCIDENT_INFO_TERM]}
          disabled
        />
        <Stack>
          <Checkbox label="동의합니다" isChecked={agreements[FIELD.ACCIDENT_INFO_TERM]} readOnly />
        </Stack>
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.ABANDONMENT_INFO)}>유기 유의사항</BadgeLabel>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <Textarea
          {...register(FIELD.ABANDONMENT_INFO)}
          isChecked={agreements[FIELD.ABANDONMENT_INFO_TERM]}
          disabled
        />
        <Stack>
          <Checkbox
            label="동의합니다"
            isChecked={agreements[FIELD.ABANDONMENT_INFO_TERM]}
            readOnly
          />
        </Stack>
      </Card>
    </>
  );
}
