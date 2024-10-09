import { AgreementsListType, FIELD, FIELD_KEYS } from "constants/field";

import { BadgeLabel, Checkbox } from "components/common";
import DayMultiCheck from "components/common/Select/DayMultiCheck";
import SingleRadio from "components/common/Select/SingleRadio";
import { Textarea } from "components/common/Textarea";
import { useFormContext } from "react-hook-form";

import { Caption, Card, Label, Stack } from "../styles";
interface TicketInfoProps {
  ticket?: {
    ticketType: string;
    roundTicketNumber: number[];
    monthlyTicketNumber: number[];
    openDays: string[];
    attendanceDays: string[];
    enrollmentRoundTicketNumber: number;
    enrollmentMonthlyTicketNumber: number;
  };
  item?: Map<number, boolean>;
  agreements: AgreementsListType;
}

export function TicketInfo({ ticket, item, agreements }: TicketInfoProps) {
  const { register, watch } = useFormContext();

  const selectedTicketType = watch(FIELD.TICKET_TYPE);
  const roundTicketText = ticket?.[FIELD.ROUND_TICKET_NUMBER]?.map((number) => `${number}회`) ?? [];
  const monthlyTicketText =
    ticket?.[FIELD.MONTHLY_TICKET_NUMBER]?.map((number) => `${number}주`) ?? [];
  const enrollmentRoundTicketNumber = ticket?.[FIELD.ENROLLMENT_ROUND_TICKET_NUMBER] + "회";
  const enrollmentMonthlyTicketNumber = ticket?.[FIELD.ENROLLMENT_MONTHLY_TICKET_NUMBER] + "주";

  return (
    <>
      <Card>
        <Label>가격 안내</Label>
        <Textarea {...register(FIELD.PRICE_INFO)} disabled />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.TICKET_TYPE)}>이용권 종류</BadgeLabel>
        <Caption>회차권과 정기권 중 원하시는 이용권 종류를 선택해 주세요</Caption>
        <SingleRadio
          name={FIELD.TICKET_TYPE}
          radiosText={["정기권", "회차권"]}
          defaultSelect={ticket?.ticketType}
        />
      </Card>
      {selectedTicketType &&
        (selectedTicketType === "정기권" ? (
          <Card>
            <BadgeLabel isRequired={item?.get(FIELD_KEYS.MONTHLY_TICKET_NUMBER)}>
              정기권 유형
            </BadgeLabel>
            <SingleRadio
              name={FIELD.MONTHLY_TICKET_NUMBER}
              radiosText={monthlyTicketText}
              defaultSelect={enrollmentMonthlyTicketNumber}
              isPreviewMode
              disabled
            />
          </Card>
        ) : (
          <Card>
            <BadgeLabel isRequired={item?.get(FIELD_KEYS.ROUND_TICKET_NUMBER)}>
              회차권 유형
            </BadgeLabel>
            <SingleRadio
              name={FIELD.ROUND_TICKET_NUMBER}
              radiosText={roundTicketText}
              defaultSelect={enrollmentRoundTicketNumber}
              isPreviewMode
              disabled
            />
          </Card>
        ))}
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.OPEN_DAYS)}>등원 요일 선택</BadgeLabel>
        <DayMultiCheck
          name={FIELD.ATTENDANCE_DAYS}
          openDays={ticket?.openDays}
          disabled
          isPreviewMode
        />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.TICKET_INFO)}>유의사항</BadgeLabel>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
        <Textarea
          {...register(FIELD.TICKET_INFO)}
          isChecked={agreements[FIELD.TICKET_INFO_TERM]}
          disabled
        />
        <Stack>
          <Checkbox label="동의합니다" isChecked={agreements[FIELD.TICKET_INFO_TERM]} readOnly />
        </Stack>
      </Card>
    </>
  );
}
