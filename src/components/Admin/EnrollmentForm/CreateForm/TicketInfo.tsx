import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import TextArea from "components/common/TextArea";
import MultiCheck from "components/common/Select/MultiCheck";
import AdminTitle from "components/common/Title/AdminTitle";
import DayMultiCheck from "components/common/Select/DayMultiCheck";
import Checkbox from "components/common/Checkbox";
import TicketType from "../TicketType";

import { ITEM_KEYS } from "constants/item";
import { Card, Caption, Stack } from "../styles";

const TicketInfo = () => {
  const { control, watch, setValue } = useFormContext();

  const selectedTicketTypes = watch("ticketType");

  const isMonthlySelected = selectedTicketTypes?.includes("정기권");
  const isRoundSelected = selectedTicketTypes?.includes("회차권");

  useEffect(() => {
    if (!isMonthlySelected) {
      setValue("monthlyTicketNumber", []);
    }
    if (!isRoundSelected) {
      setValue("roundTicketNumber", []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMonthlySelected, isRoundSelected]);

  return (
    <>
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.PRICE_INFO}`} control={control} hasBadge>
          가격 안내
        </AdminTitle>
        <Caption>견주에게 안내할 가격 내용을 입력해 주세요</Caption>
        <TextArea name="priceInfo" placeholder="원장님이 입력한 가격안내 내용이 보이게 됩니다." />
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.TICKET_TYPE}`} control={control} hasBadge>
          이용권 종류
        </AdminTitle>
        <Caption>복수 선택이 가능해요</Caption>
        <MultiCheck name="ticketType" radiosText={["정기권", "회차권"]} />
      </Card>
      {isMonthlySelected && (
        <Card>
          <AdminTitle
            name={`requiredItemList.${ITEM_KEYS.MONTHLY_TICKET_NUMBER}`}
            control={control}
            hasBadge
          >
            정기권 유형
          </AdminTitle>
          <Caption>최대 6개까지 추가 가능하며, 최소 1개의 선택지가 있어야해요</Caption>
          <TicketType
            ticketType="MONTHLY"
            control={control}
            name="monthlyTicketNumber"
            defaultValues={[1, 2, 4, 8]}
          />
        </Card>
      )}
      {isRoundSelected && (
        <Card>
          <AdminTitle
            name={`requiredItemList.${ITEM_KEYS.ROUND_TICKET_NUMBER}`}
            control={control}
            hasBadge
          >
            회차권 유형
          </AdminTitle>
          <Caption>최대 6개까지 추가 가능하며, 최소 1개의 선택지가 있어야해요</Caption>
          <TicketType
            ticketType="ROUND"
            control={control}
            name="roundTicketNumber"
            defaultValues={[1, 3, 5, 10]}
          />
        </Card>
      )}
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.OPEN_DAYS}`} control={control} hasBadge>
          등원 요일 선택
        </AdminTitle>
        <Caption>유치원 휴무날처럼 견주가 신청하면 안 되는 요일을 해제해 주세요</Caption>
        <DayMultiCheck name="openDays" defaultChecked />
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.TICKET_INFO}`} control={control} hasBadge>
          유의사항
        </AdminTitle>
        <TextArea name="ticketInfo" placeholder="유의사항을 입력해 주세요" />
        <Stack>
          <Checkbox name="null" disabled>
            동의합니다
          </Checkbox>
        </Stack>
      </Card>
    </>
  );
};

export default TicketInfo;
