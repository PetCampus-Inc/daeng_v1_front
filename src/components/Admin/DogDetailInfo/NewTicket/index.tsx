import { newTicketYear, monthsArray, daysArray } from "constants/date";

import DayMultiCheck from "components/common/Select/DayMultiCheck";
import SelectNumber from "components/common/Select/SelectNumber";
import SingleRadio from "components/common/Select/SingleRadio";
import { useFormContext } from "react-hook-form";
import { useRecoilState } from "recoil";
import { newTicketCardDataAtom } from "store/admin";
import { addZero } from "utils/date";

import * as S from "./styles";

const NewTicket = () => {
  const [data] = useRecoilState(newTicketCardDataAtom);
  const { watch, setValue } = useFormContext();
  const ticketType = data?.ticketType === "ROUND" ? "회차권" : "정기권";
  console.log(ticketType);
  const selectedTicketType = watch("ticketType") ?? ticketType;
  const roundTicketText = [10, 20, 30].map((number) => `${number}회`) || [];
  const monthlyTicketText = [10, 11, 12]?.map((number) => `${number}주`) || [];

  if (!data) return <div>로딩중</div>;

  return (
    <>
      <S.Card>
        <S.Label>이용권 시작일</S.Label>
        <S.Caption>이용권 시작 날짜를 설정해 주세요</S.Caption>
        <div style={{ display: "flex", gap: "5px" }}>
          <SelectNumber
            name="year"
            numberList={newTicketYear}
            defaultValue={data.ticketStartDate[0].toString()}
            watch={watch}
            setValue={setValue}
          />
          <SelectNumber
            name="month"
            numberList={monthsArray}
            defaultValue={addZero(data.ticketStartDate[1]) as string}
            watch={watch}
            setValue={setValue}
          />
          <SelectNumber
            name="day"
            numberList={daysArray}
            defaultValue={addZero(data.ticketStartDate[2]) as string}
            watch={watch}
            setValue={setValue}
          />
        </div>
      </S.Card>
      <S.Card>
        <S.Label>이용권 유형</S.Label>
        <SingleRadio
          name="ticketType"
          radiosText={["정기권", "회차권"]}
          defaultSelect={ticketType}
        />
      </S.Card>
      {selectedTicketType === "회차권" ? (
        <S.Card>
          <S.Label>회차권 유형</S.Label>
          <SingleRadio
            name="roundTicketNumber"
            defaultSelect={`${data.allRoundTicket.toString()}회`}
            radiosText={roundTicketText}
          />
        </S.Card>
      ) : (
        <S.Card>
          <S.Label>정기권 유형</S.Label>
          <SingleRadio
            name="monthlyTicketNumber"
            defaultSelect={`${data.monthlyTicketNumber.toString()}주`}
            radiosText={monthlyTicketText}
          />
        </S.Card>
      )}
      <S.Card>
        <S.Label>요일 선택</S.Label>
        <DayMultiCheck
          name="openDays"
          defaultSelect={data.attendanceDays}
          openDays={["월", "화", "금", "토", "일"]}
        />
      </S.Card>
    </>
  );
};

export default NewTicket;
