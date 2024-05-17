import { ITEM_ENGLISH_TO_KOREAN, ITEM_KEYS } from "constants/item";

import Checkbox from "components/common/Checkbox";
import DayMultiCheck from "components/common/Select/DayMultiCheck";
import SingleRadio from "components/common/Select/SingleRadio";
import { Caption } from "components/common/Select/styles";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { Controller, useFormContext } from "react-hook-form";
import { handlePreventDefault } from "utils/preventDefault";

import { Card, Stack, Label } from "./styles";

interface TicketInfoProps {
  ticket?: {
    roundTicketNumber: number[];
    monthlyTicketNumber: number[];
    openDays?: string[];
  };
  requiredItems?: Map<number, boolean>;
}

const TicketInfo = ({ ticket, requiredItems }: TicketInfoProps) => {
  const { control, register, watch } = useFormContext();

  const requiredItemsMap = new Map<number, boolean>([
    [ITEM_KEYS.TICKET_TYPE, false],
    [ITEM_KEYS.MONTHLY_TICKET_NUMBER, true],
    [ITEM_KEYS.ROUND_TICKET_NUMBER, true],
    [ITEM_KEYS.OPEN_DAYS, true],
    [ITEM_KEYS.TICKET_INFO, true]
  ]);

  const selectedTicketType = watch("ticketType");
  const roundTicketText = ticket?.roundTicketNumber?.map((number) => `${number}회`) || [];
  const monthlyTicketText = ticket?.monthlyTicketNumber?.map((number) => `${number}주`) || [];

  return (
    <>
      <Card>
        <Label>가격 안내</Label>
        <TextArea {...register("priceInfo")} defaultValue={watch("priceInfo")} disabled />
      </Card>
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.TICKET_TYPE)}>이용권 종류</Title>
        <Caption>회차권과 정기권 중 원하시는 이용권 종류를 선택해 주세요</Caption>
        <SingleRadio
          name="ticketType"
          radiosText={["정기권", "회차권"]}
          isRequired={requiredItemsMap?.get(ITEM_KEYS.TICKET_TYPE)}
          defaultSelect={ITEM_ENGLISH_TO_KOREAN[watch("enrollmentTicketType")]}
          preventDefaultClick={handlePreventDefault}
        />
      </Card>
      {selectedTicketType &&
        (selectedTicketType === "정기권" && watch("enrollmentTicketType") === "MONTHLY" ? (
          <Card>
            <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.MONTHLY_TICKET_NUMBER)}>
              정기권 유형
            </Title>
            <SingleRadio
              name="monthlyTicketNumber"
              radiosText={monthlyTicketText}
              isRequired={requiredItemsMap?.get(ITEM_KEYS.MONTHLY_TICKET_NUMBER)}
              defaultSelect={`${watch("enrollmentMonthlyTicketNumber")}주`}
              preventDefaultClick={handlePreventDefault}
            />
          </Card>
        ) : (
          <Card>
            <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.ROUND_TICKET_NUMBER)}>
              회차권 유형
            </Title>
            <SingleRadio
              name="roundTicketNumber"
              radiosText={roundTicketText}
              isRequired={requiredItemsMap?.get(ITEM_KEYS.ROUND_TICKET_NUMBER)}
              defaultSelect={`${watch("enrollmentRoundTicketNumber")}회`}
              preventDefaultClick={handlePreventDefault}
            />
          </Card>
        ))}
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.OPEN_DAYS)}>등원 요일 선택</Title>
        <DayMultiCheck
          name="attendanceDays"
          isRequired={requiredItemsMap?.get(ITEM_KEYS.OPEN_DAYS)}
          preventDefaultClick={handlePreventDefault}
        />
      </Card>
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.TICKET_INFO)}>유의사항</Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
        <TextArea {...register("ticketInfo")} isChecked={watch("ticketInfo")} disabled />
        <Stack>
          <Controller
            name="ticketInfo_agreement"
            control={control}
            rules={{ required: requiredItemsMap?.get(ITEM_KEYS.TICKET_INFO) }}
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
