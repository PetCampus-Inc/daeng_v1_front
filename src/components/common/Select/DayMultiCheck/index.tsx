import { WEEKDAYS } from "constants/date";
import { FIELD } from "constants/field";

import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import * as S from "../styles";

interface IDayMultiCheck extends React.InputHTMLAttributes<HTMLInputElement> {
  caption?: string;
  openDays?: string[];
  defaultSelect?: string[];
  isPreviewMode?: boolean;
  isRequired?: boolean;
  preventDefaultClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

// 요일 복수 선택
const DayMultiCheck = ({
  name,
  caption,
  openDays,
  defaultSelect,
  isPreviewMode = false,
  isRequired = false,
  preventDefaultClick,
  ...props
}: IDayMultiCheck) => {
  const { register, watch, setValue } = useFormContext();
  const selectedDays = watch(FIELD.OPEN_DAYS);

  const ticketType = watch(FIELD.TICKET_TYPE);
  const roundTicketNumber = watch(FIELD.ROUND_TICKET_NUMBER);

  const isRoundTicket = ticketType === "회차권";

  useEffect(() => {
    if (isRoundTicket) setValue(FIELD.OPEN_DAYS, [""]);
  }, [setValue, isRoundTicket, roundTicketNumber]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    const limitDay = Number(roundTicketNumber.replace("회", ""));

    if (!checked && selectedDays.length === 1) {
      e.target.checked = true;
      return;
    } else if (isRoundTicket && selectedDays.length >= limitDay) {
      e.target.checked = false;
    }
    register(FIELD.OPEN_DAYS).onChange(e);
  };

  return (
    <S.Container>
      {caption && <S.Caption>{caption}</S.Caption>}
      <S.RadioContainer>
        {WEEKDAYS.map((day) => (
          <div style={{ width: "100%" }} key={day}>
            <S.DayCheckInput
              id={day}
              type="checkbox"
              {...register(`${name}`, { required: isRequired })}
              value={day}
              onChange={handleChange}
              defaultChecked={defaultSelect?.includes(day)}
              disabled={props.disabled ? props.disabled : openDays && !openDays?.includes(day)}
              className={openDays && openDays?.includes(day) ? "open-day" : ""}
              onClick={preventDefaultClick}
              {...props}
            />
            <S.DayCheckLabel htmlFor={day} className={isPreviewMode ? "preview" : ""}>
              {day}
            </S.DayCheckLabel>
          </div>
        ))}
      </S.RadioContainer>
    </S.Container>
  );
};

export default DayMultiCheck;
