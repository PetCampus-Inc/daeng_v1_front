import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { Card, Stack } from "./styles";
import SingleRadio from "components/common/Select/SingleRadio";
import DayMultiCheck from "components/common/Select/DayMultiCheck";
import { Caption } from "components/common/Select/styles";
import { useFormContext } from "react-hook-form";
import type { ITicketInfo } from "types/School.type";
import { ITEM_KEYS } from "constants/item";
import Checkbox from "components/common/Checkbox";
import { Label } from "components/common/Title/style";
import { useEffect } from "react";

interface TicketInfoProps {
  info: ITicketInfo;
  requiredItems: Map<number, boolean>;
}

const TicketInfo = ({ info, requiredItems }: TicketInfoProps) => {
  const { watch, control, setValue } = useFormContext();

  const selectedTicketType = watch("ticketType");
  const roundTicketText = JSON.parse(info.roundTicketNumber).map((number: number) => `${number}회`);
  const monthlyTicketText = JSON.parse(info.monthlyTicketNumber).map(
    (number: number) => `${number}주`
  );

  useEffect(() => {
    if (selectedTicketType === "정기권") {
      setValue("roundTicketNumber", undefined);
    } else {
      setValue("monthlyTicketNumber", undefined);
    }
  }, [selectedTicketType]);

  return (
    <>
      <Card>
        <Label>가격 안내</Label>
        <TextArea name="priceInfo" readOnly value={info.priceInfo} />
      </Card>
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.TICKET_TYPE)}>이용권 종류</Title>
        <Caption>회차권과 정기권 중 원하시는 이용권 종류를 선택해 주세요</Caption>
        <SingleRadio name="ticketType" radiosText={["정기권", "회차권"]} />
      </Card>
      {selectedTicketType &&
        (selectedTicketType === "정기권" ? (
          <Card>
            <Title isRequired={requiredItems.get(ITEM_KEYS.MONTHLY_TICKET_NUMBER)}>
              정기권 유형
            </Title>
            <SingleRadio name="monthlyTicketNumber" radiosText={monthlyTicketText} />
          </Card>
        ) : (
          <Card>
            <Title isRequired={requiredItems.get(ITEM_KEYS.ROUND_TICKET_NUMBER)}>회차권 유형</Title>
            <SingleRadio name="roundTicketNumber" radiosText={roundTicketText} />
          </Card>
        ))}
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.OPEN_DAYS)}>등원 요일 선택</Title>
        <DayMultiCheck name="attendanceDays" openDays={info.openDays} />
      </Card>
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.TICKET_INFO)}>유의사항</Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
        <TextArea id="ticketInfo" readOnly value={info.ticketInfo} resizable={false} />
        <Stack>
          <Checkbox
            name="ticketInfo"
            control={control}
            isChecked={watch("ticketInfo")}
            ariaLabel="동의"
          >
            동의합니다
          </Checkbox>
        </Stack>
      </Card>
    </>
  );
};

export default TicketInfo;
