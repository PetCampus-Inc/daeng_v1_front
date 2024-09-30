import { FIELD, FIELD_KEYS } from "constants/field";
import { REQUIRED_ITEMS_DOG_MAP } from "constants/requiredItemsMap";

import { Checkbox } from "components/common";
import DayMultiCheck from "components/common/Select/DayMultiCheck";
import SingleRadio from "components/common/Select/SingleRadio";
import { Caption } from "components/common/Select/styles";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { Controller, useFormContext } from "react-hook-form";
import { getLabelForValue } from "utils/formatter";

import { Card, Stack, Label } from "./styles";

interface TicketInfoProps {
  ticket?: {
    roundTicketNumber: number[];
    monthlyTicketNumber: number[];
    openDays?: string[];
  };
}

const TicketInfo = ({ ticket }: TicketInfoProps) => {
  const { control, register, getValues } = useFormContext();
  const selectedTicketType = getValues(FIELD.TICKET_TYPE);
  const roundTicketText = ticket?.[FIELD.ROUND_TICKET_NUMBER]?.map((number) => `${number}회`) || [];
  const monthlyTicketText =
    ticket?.[FIELD.MONTHLY_TICKET_NUMBER]?.map((number) => `${number}주`) || [];

  const formatTickeyType = getLabelForValue(
    FIELD.TICKET_TYPE,
    getValues(FIELD.ENROLLMENT_TICKET_TYPE)
  );
  return (
    <>
      <Card>
        <Label>가격 안내</Label>
        <TextArea {...register(FIELD.PRICE_INFO)} disabled />
      </Card>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.TICKET_TYPE)}>이용권 종류</Title>
        <Caption>회차권과 정기권 중 원하시는 이용권 종류를 선택해 주세요</Caption>
        <SingleRadio
          name={FIELD.TICKET_TYPE}
          radiosText={["정기권", "회차권"]}
          defaultSelect={formatTickeyType}
        />
      </Card>
      {selectedTicketType &&
        (selectedTicketType === "정기권" &&
        getValues(FIELD.ENROLLMENT_TICKET_TYPE) === "MONTHLY" ? (
          <Card>
            <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.MONTHLY_TICKET_NUMBER)}>
              정기권 유형
            </Title>
            <SingleRadio
              name={FIELD.MONTHLY_TICKET_NUMBER}
              radiosText={monthlyTicketText}
              defaultSelect={`${getValues(FIELD.ENROLLMENT_MONTHLY_TICKET_NUMBER)}주`}
            />
          </Card>
        ) : (
          <Card>
            <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.ROUND_TICKET_NUMBER)}>
              회차권 유형
            </Title>
            <SingleRadio
              name={FIELD.ROUND_TICKET_NUMBER}
              radiosText={roundTicketText}
              defaultSelect={`${getValues(FIELD.ENROLLMENT_ROUND_TICKET_NUMBER)}회`}
            />
          </Card>
        ))}
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.OPEN_DAYS)}>등원 요일 선택</Title>
        <DayMultiCheck name={FIELD.ATTENDANCE_DAYS} />
      </Card>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.TICKET_INFO)}>유의사항</Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
        <TextArea
          {...register(FIELD.TICKET_INFO)}
          isChecked={getValues(FIELD.TICKET_INFO_TERM)}
          disabled
        />
        <Stack>
          <Controller
            name={FIELD.TICKET_INFO_TERM}
            control={control}
            rules={{ required: REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.TICKET_INFO) }}
            render={({ field: { ref, ...field } }) => (
              <Checkbox label="동의합니다" ref={ref} isChecked={true} onChange={field.onChange} />
            )}
          />
        </Stack>
      </Card>
    </>
  );
};

export default TicketInfo;
