import { newTicketYear, monthsArray, daysArray } from "constants/date";
import { FIELD } from "constants/field";

import { Flex } from "components/common";
import DayMultiCheck from "components/common/Select/DayMultiCheck";
import SelectNumber from "components/common/Select/SelectNumber";
import SingleRadio from "components/common/Select/SingleRadio";
import { FIELD_MAPPING } from "libs/adapters";
import { useFormContext } from "react-hook-form";

import * as S from "./styles";

import type { NewTicketFormType } from "libs/adapters";

interface NewTicketFormProps {
  formData: NewTicketFormType;
  attendanceDays: string[];
}

export function NewTicketForm({ formData, attendanceDays }: NewTicketFormProps) {
  const { watch, setValue } = useFormContext();

  const selectedTicketType = watch(FIELD.TICKET_TYPE);

  const TicketTypeText = formData[FIELD.TICKET_TYPE];
  const roundTicketText =
    formData?.[FIELD.ROUND_TICKET_NUMBER]?.map((number) => `${number}회`) ?? [];
  const monthlyTicketText =
    formData?.[FIELD.MONTHLY_TICKET_NUMBER]?.map((number) => `${number}주`) ?? [];

  return (
    <Flex direction="column" gap={4}>
      <S.Card>
        <S.Label>이용권 시작일</S.Label>
        <S.Caption>이용권 시작 날짜를 설정해 주세요</S.Caption>
        <div style={{ display: "flex", gap: "5px" }}>
          <SelectNumber name="year" numberList={newTicketYear} watch={watch} setValue={setValue} />
          <SelectNumber name="month" numberList={monthsArray} watch={watch} setValue={setValue} />
          <SelectNumber name="day" numberList={daysArray} watch={watch} setValue={setValue} />
        </div>
      </S.Card>
      <S.Card>
        <S.Label>이용권 유형</S.Label>
        <SingleRadio name={FIELD.TICKET_TYPE} radiosText={TicketTypeText} />
      </S.Card>
      {selectedTicketType === FIELD_MAPPING["ticketType"].MONTHLY ? (
        <S.Card>
          <S.Label>정기권 유형</S.Label>
          <SingleRadio name={FIELD.MONTHLY_TICKET_NUMBER} radiosText={monthlyTicketText} />
        </S.Card>
      ) : (
        <S.Card>
          <S.Label>회차권 유형</S.Label>
          <SingleRadio name={FIELD.ROUND_TICKET_NUMBER} radiosText={roundTicketText} />
        </S.Card>
      )}
      <S.Card>
        <S.Label>요일 선택</S.Label>
        <DayMultiCheck name={FIELD.ATTENDANCE_DAYS} defaultSelect={attendanceDays} />
      </S.Card>
    </Flex>
  );
}
