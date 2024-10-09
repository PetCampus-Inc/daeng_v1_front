import { FIELD, FIELD_KEYS } from "constants/field";

import { Checkbox } from "components/common";
import DayMultiCheck from "components/common/Select/DayMultiCheck";
import MultiCheck from "components/common/Select/MultiCheck";
import { Textarea } from "components/common/Textarea";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { Label } from "../Label/Label";
import { Card, Caption, Stack } from "../styles";
import { TicketType } from "../TicketType/TicketType";

export function TicketInfo() {
  const { register, control, watch, unregister } = useFormContext();

  const selectedTicketTypes = watch(FIELD.TICKET_TYPE);

  const isMonthlySelected = selectedTicketTypes?.includes?.("정기권");
  const isRoundSelected = selectedTicketTypes?.includes?.("회차권");

  useEffect(() => {
    if (!isMonthlySelected) {
      unregister(`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.MONTHLY_TICKET_NUMBER}`);
      unregister(FIELD.MONTHLY_TICKET_NUMBER);
    }
    if (!isRoundSelected) {
      unregister(`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.ROUND_TICKET_NUMBER}`);
      unregister(FIELD.ROUND_TICKET_NUMBER);
    }
  }, [isMonthlySelected, isRoundSelected]);

  return (
    <>
      <Card>
        <Label control={control} showBadge>
          가격 안내
        </Label>
        <Caption>견주에게 안내할 가격 내용을 입력해 주세요</Caption>
        <Textarea
          {...register(FIELD.PRICE_INFO, { required: true })}
          placeholder="원장님이 입력한 가격안내 내용이 보이게 됩니다."
        />
      </Card>
      <Card>
        <Label
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.TICKET_TYPE}`}
          control={control}
          showBadge
        >
          이용권 종류
        </Label>
        <Caption>복수 선택이 가능해요</Caption>
        <MultiCheck name={FIELD.TICKET_TYPE} radiosText={["정기권", "회차권"]} isRequired />
      </Card>
      {isMonthlySelected && (
        <Card>
          <Label
            name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.MONTHLY_TICKET_NUMBER}`}
            control={control}
            showBadge
          >
            정기권 유형
          </Label>
          <Caption>최대 6개까지 추가 가능하며, 최소 1개의 선택지가 있어야해요</Caption>
          <TicketType
            ticketType="MONTHLY"
            control={control}
            name={FIELD.MONTHLY_TICKET_NUMBER}
            defaultValues={[1, 2, 4, 8]}
          />
        </Card>
      )}
      {isRoundSelected && (
        <Card>
          <Label
            name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.ROUND_TICKET_NUMBER}`}
            control={control}
            showBadge
          >
            회차권 유형
          </Label>
          <Caption>최대 6개까지 추가 가능하며, 최소 1개의 선택지가 있어야해요</Caption>
          <TicketType
            ticketType="ROUND"
            control={control}
            name={FIELD.ROUND_TICKET_NUMBER}
            defaultValues={[1, 3, 5, 10]}
          />
        </Card>
      )}
      <Card>
        <Label name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.OPEN_DAYS}`} control={control} showBadge>
          등원 요일 선택
        </Label>
        <Caption>유치원 휴무날처럼 견주가 신청하면 안 되는 요일을 해제해 주세요</Caption>
        <DayMultiCheck name={FIELD.OPEN_DAYS} defaultChecked isRequired />
      </Card>
      <Card>
        <Label
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.TICKET_INFO}`}
          control={control}
          showBadge
        >
          유의사항
        </Label>
        <Textarea
          {...register(FIELD.TICKET_INFO, { required: true })}
          placeholder="유의사항을 입력해 주세요"
        />
        <Stack>
          <Checkbox label="동의합니다" disabled />
        </Stack>
      </Card>
    </>
  );
}
