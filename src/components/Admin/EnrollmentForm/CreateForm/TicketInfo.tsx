import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import TextArea from "components/common/TextArea";
import SingleRadio from "components/common/Select/SingleRadio";
import AdminTitle from "components/common/Title/AdminTitle";
import DayMultiCheck from "components/common/Select/DayMultiCheck";
import TicketType from "../TicketType";

import { Card, Caption } from "../styles";

const TicketInfo = () => {
  const { register, control, watch, setValue } = useFormContext();

  const selectedTicketType = watch("ticketType");

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
        <AdminTitle name="pickDropNotice" hasBadge>
          가격 안내
        </AdminTitle>
        <Caption>견주에게 안내할 가격 내용을 입력해 주세요</Caption>
        <TextArea
          name="priceInfo"
          register={register}
          placeholder="원장님이 입력한 가격안내 내용이 보이게 됩니다."
        />
      </Card>
      <Card>
        <AdminTitle name="requiredItemList.ticketType" control={control} hasBadge>
          이용권 종류
        </AdminTitle>
        <Caption>복수 선택이 가능해요</Caption>
        <SingleRadio name="ticketType" radiosText={["정기권", "회차권"]} />
      </Card>
      {selectedTicketType &&
        (selectedTicketType === "정기권" ? (
          <Card>
            <AdminTitle name="requiredItemList.monthlyTicketNumber" control={control} hasBadge>
              정기권 유형
            </AdminTitle>
            <Caption>최대 6개까지 추가 가능하며, 최소 1개의 선택지가 있어야해요</Caption>
            <TicketType
              type="MONTHLY"
              name="monthlyTicketNumber"
              control={control}
              defaultValues={[1, 3, 5, 10]}
            />
          </Card>
        ) : (
          <Card>
            <AdminTitle name="requiredItemList.roundTicketNumber" control={control} hasBadge>
              회차권 유형
            </AdminTitle>
            <Caption>최대 6개까지 추가 가능하며, 최소 1개의 선택지가 있어야해요</Caption>
            <TicketType
              type="ROUND"
              name="roundTicketNumber"
              control={control}
              defaultValues={[1, 2, 4, 8]}
            />
          </Card>
        ))}
      <Card>
        <AdminTitle name="requiredItemList.attendanceDays" control={control} hasBadge>
          등원 요일 선택
        </AdminTitle>
        <Caption>유치원 휴무날처럼 견주가 신청하면 안 되는 요일을 해제해 주세요</Caption>
        <DayMultiCheck name="attendanceDays" defaultChecked={true} />
      </Card>
      <Card>
        <AdminTitle name="requiredItemList.ticketInfo" control={control} hasBadge>
          유의사항
        </AdminTitle>
        <TextArea name="ticketInfo" placeholder="유의사항을 입력해 주세요" />
      </Card>
    </>
  );
};

export default TicketInfo;
