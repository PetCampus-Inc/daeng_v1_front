import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

import Title from "components/common/Title";
import SingleRadio from "components/common/Select/SingleRadio";
import TextArea from "components/common/TextArea";
import DayMultiCheck from "components/common/Select/DayMultiCheck";
import Checkbox from "components/common/Checkbox";
import type { ITicketInfo } from "types/School.type";

import { ITEM_KEYS } from "constants/item";
import { Caption, Card, Label, Stack } from "../styles";
interface TicketInfoProps {
  info?: ITicketInfo;
  requiredItems?: Map<number, boolean>;
}

const TicketInfo = ({ info, requiredItems }: TicketInfoProps) => {
  const { watch, setValue } = useFormContext();

  const roundTicketText = info?.roundTicketNumber?.map((number) => `${number}회`) || [];
  const monthlyTicketText = info?.monthlyTicketNumber?.map((number) => `${number}주`) || [];

  const selectedTicketType = watch("ticketType");

  useEffect(() => {
    const fieldName = selectedTicketType === "정기권" ? "roundTicketNumber" : "monthlyTicketNumber";
    setValue(fieldName, undefined);
  }, [selectedTicketType, setValue]);

  return (
    <>
      <Card>
        <Label>가격 안내</Label>
        <TextArea name="priceInfo" defaultValue={info?.priceInfo} disabled />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.TICKET_TYPE)}>이용권 종류</Title>
        <Caption>회차권과 정기권 중 원하시는 이용권 종류를 선택해 주세요</Caption>
        <SingleRadio name="ticketType" radiosText={["정기권", "회차권"]} />
      </Card>
      {selectedTicketType &&
        (selectedTicketType === "정기권" ? (
          <Card>
            <Title isRequired={requiredItems?.get(ITEM_KEYS.MONTHLY_TICKET_NUMBER)}>
              정기권 유형
            </Title>
            <SingleRadio name="monthlyTicketNumber" radiosText={monthlyTicketText} disabled />
          </Card>
        ) : (
          <Card>
            <Title isRequired={requiredItems?.get(ITEM_KEYS.ROUND_TICKET_NUMBER)}>
              회차권 유형
            </Title>
            <SingleRadio name="roundTicketNumber" radiosText={roundTicketText} disabled />
          </Card>
        ))}
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.OPEN_DAYS)}>등원 요일 선택</Title>
        <DayMultiCheck name="openDays" openDays={info?.openDays} readOnly isPreviewMode />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.TICKET_INFO)}>유의사항</Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
        <TextArea name="ticketInfoField" defaultValue={info?.ticketInfo} disabled />
        <Stack>
          <Checkbox name="null" readOnly>
            동의합니다
          </Checkbox>
        </Stack>
      </Card>
    </>
  );
};

export default TicketInfo;
