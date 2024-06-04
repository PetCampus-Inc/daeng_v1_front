import { AgreementsListType, ITEM_KEYS } from "constants/item";

import { Checkbox } from "components/common";
import DayMultiCheck from "components/common/Select/DayMultiCheck";
import SingleRadio from "components/common/Select/SingleRadio";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { useFormContext } from "react-hook-form";

import { Caption, Card, Label, Stack } from "../styles";
interface TicketInfoProps {
  ticket?: {
    ticketType: string;
    roundTicketNumber: number[];
    monthlyTicketNumber: number[];
    openDays: string[];
    enrollmentRoundTicketNumber: number;
    enrollmentMonthlyTicketNumber: number;
  };
  item?: Map<number, boolean>;
  agreements: AgreementsListType;
}

const TicketInfo = ({ ticket, item, agreements }: TicketInfoProps) => {
  const { register, watch } = useFormContext();

  const selectedTicketType = watch("ticketType");
  const roundTicketText = ticket?.roundTicketNumber?.map((number) => `${number}회`) ?? [];
  const monthlyTicketText = ticket?.monthlyTicketNumber?.map((number) => `${number}주`) ?? [];
  const enrollmentRoundTicketNumber = ticket?.enrollmentRoundTicketNumber + "회";
  const enrollmentMonthlyTicketNumber = ticket?.enrollmentMonthlyTicketNumber + "주";

  return (
    <>
      <Card>
        <Label>가격 안내</Label>
        <TextArea {...register("priceInfo")} disabled />
      </Card>
      <Card>
        <Title isRequired={item?.get(ITEM_KEYS.TICKET_TYPE)}>이용권 종류</Title>
        <Caption>회차권과 정기권 중 원하시는 이용권 종류를 선택해 주세요</Caption>
        <SingleRadio
          name="ticketType"
          radiosText={["정기권", "회차권"]}
          defaultSelect={ticket?.ticketType}
        />
      </Card>
      {selectedTicketType &&
        (selectedTicketType === "정기권" ? (
          <Card>
            <Title isRequired={item?.get(ITEM_KEYS.MONTHLY_TICKET_NUMBER)}>정기권 유형</Title>
            <SingleRadio
              name="monthlyTicketNumber"
              radiosText={monthlyTicketText}
              defaultSelect={enrollmentMonthlyTicketNumber}
              isPreviewMode
              disabled
            />
          </Card>
        ) : (
          <Card>
            <Title isRequired={item?.get(ITEM_KEYS.ROUND_TICKET_NUMBER)}>회차권 유형</Title>
            <SingleRadio
              name="roundTicketNumber"
              radiosText={roundTicketText}
              defaultSelect={enrollmentRoundTicketNumber}
              isPreviewMode
              disabled
            />
          </Card>
        ))}
      <Card>
        <Title isRequired={item?.get(ITEM_KEYS.OPEN_DAYS)}>등원 요일 선택</Title>
        <DayMultiCheck name="openDays" openDays={ticket?.openDays} disabled isPreviewMode />
      </Card>
      <Card>
        <Title isRequired={item?.get(ITEM_KEYS.TICKET_INFO)}>유의사항</Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
        <TextArea
          {...register("ticketInfo")}
          isChecked={agreements.ticketInfo_agreement}
          disabled
        />
        <Stack>
          <Checkbox label="동의합니다" isChecked={agreements.ticketInfo_agreement} readOnly />
        </Stack>
      </Card>
    </>
  );
};

export default TicketInfo;
