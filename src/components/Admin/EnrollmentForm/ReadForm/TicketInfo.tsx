import { FIELD, FIELD_KEYS } from "constants/field";

import { Checkbox } from "components/common";
import DayMultiCheck from "components/common/Select/DayMultiCheck";
import SingleRadio from "components/common/Select/SingleRadio";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { useFormContext } from "react-hook-form";

import { Caption, Card, Label, Stack } from "../styles";
interface TicketInfoProps {
  ticket?: {
    roundTicketNumber: number[];
    monthlyTicketNumber: number[];
    openDays: string[];
  };
  item?: Map<number, boolean>;
}

const TicketInfo = ({ ticket, item }: TicketInfoProps) => {
  const { register, watch } = useFormContext();

  const selectedTicketType = watch(FIELD.TICKET_TYPE);
  const roundTicketText = ticket?.[FIELD.ROUND_TICKET_NUMBER]?.map((number) => `${number}회`) || [];
  const monthlyTicketText =
    ticket?.[FIELD.MONTHLY_TICKET_NUMBER]?.map((number) => `${number}주`) || [];

  return (
    <>
      <Card>
        <Label>가격 안내</Label>
        <TextArea {...register(FIELD.PRICE_INFO)} disabled />
      </Card>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.TICKET_TYPE)}>이용권 종류</Title>
        <Caption>회차권과 정기권 중 원하시는 이용권 종류를 선택해 주세요</Caption>
        <SingleRadio name={FIELD.TICKET_TYPE} radiosText={["정기권", "회차권"]} />
      </Card>
      {selectedTicketType &&
        (selectedTicketType === "정기권" ? (
          <Card>
            <Title isRequired={item?.get(FIELD_KEYS.MONTHLY_TICKET_NUMBER)}>정기권 유형</Title>
            <SingleRadio
              name={FIELD.MONTHLY_TICKET_NUMBER}
              radiosText={monthlyTicketText}
              isPreviewMode
              disabled
            />
          </Card>
        ) : (
          <Card>
            <Title isRequired={item?.get(FIELD_KEYS.ROUND_TICKET_NUMBER)}>회차권 유형</Title>
            <SingleRadio
              name={FIELD.ROUND_TICKET_NUMBER}
              radiosText={roundTicketText}
              isPreviewMode
              disabled
            />
          </Card>
        ))}
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.OPEN_DAYS)}>등원 요일 선택</Title>
        <DayMultiCheck name={FIELD.OPEN_DAYS} openDays={ticket?.openDays} disabled isPreviewMode />
      </Card>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.TICKET_INFO)}>유의사항</Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
        <TextArea {...register(FIELD.TICKET_INFO)} disabled />
        <Stack>
          <Checkbox label="동의합니다" readOnly />
        </Stack>
      </Card>
    </>
  );
};

export default TicketInfo;
