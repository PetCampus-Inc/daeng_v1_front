import { ITEM_KEYS } from "constants/item";

import { Checkbox } from "components/common";
import DayMultiCheck from "components/common/Select/DayMultiCheck";
import SingleRadio from "components/common/Select/SingleRadio";
import { Caption } from "components/common/Select/styles";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { Controller, useFormContext } from "react-hook-form";

import { Card, Stack, Label } from "./styles";

interface TicketInfoProps {
  ticket?: {
    roundTicketNumber: number[];
    monthlyTicketNumber: number[];
    openDays: string[];
  };
  requiredItems?: Map<number, boolean>;
}

const TicketInfo = ({ ticket, requiredItems }: TicketInfoProps) => {
  const { control, register, watch } = useFormContext();

  const selectedTicketType = watch("ticketType");
  const roundTicketText = ticket?.roundTicketNumber?.map((number) => `${number}회`) || [];
  const monthlyTicketText = ticket?.monthlyTicketNumber?.map((number) => `${number}주`) || [];

  return (
    <>
      <Card>
        <Label>가격 안내</Label>
        <TextArea {...register("priceInfo")} disabled />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.TICKET_TYPE)}>이용권 종류</Title>
        <Caption>회차권과 정기권 중 원하시는 이용권 종류를 선택해 주세요</Caption>
        <SingleRadio
          name="ticketType"
          radiosText={["정기권", "회차권"]}
          isRequired={requiredItems?.get(ITEM_KEYS.TICKET_TYPE)}
        />
      </Card>
      {selectedTicketType &&
        (selectedTicketType === "정기권" ? (
          <Card>
            <Title isRequired={requiredItems?.get(ITEM_KEYS.MONTHLY_TICKET_NUMBER)}>
              정기권 유형
            </Title>
            <SingleRadio
              name="monthlyTicketNumber"
              radiosText={monthlyTicketText}
              isRequired={requiredItems?.get(ITEM_KEYS.MONTHLY_TICKET_NUMBER)}
            />
          </Card>
        ) : (
          <Card>
            <Title isRequired={requiredItems?.get(ITEM_KEYS.ROUND_TICKET_NUMBER)}>
              회차권 유형
            </Title>
            <SingleRadio
              name="roundTicketNumber"
              radiosText={roundTicketText}
              isRequired={requiredItems?.get(ITEM_KEYS.ROUND_TICKET_NUMBER)}
            />
          </Card>
        ))}
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.OPEN_DAYS)}>등원 요일 선택</Title>
        <DayMultiCheck
          name="openDays"
          openDays={ticket?.openDays}
          isRequired={requiredItems?.get(ITEM_KEYS.OPEN_DAYS)}
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.TICKET_INFO)}>유의사항</Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
        <TextArea {...register("ticketInfo")} isChecked={watch("ticketInfo_agreement")} disabled />
        <Stack>
          <Controller
            name="ticketInfo_agreement"
            control={control}
            rules={{ required: requiredItems?.get(ITEM_KEYS.TICKET_INFO) }}
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
  );
};

export default TicketInfo;
