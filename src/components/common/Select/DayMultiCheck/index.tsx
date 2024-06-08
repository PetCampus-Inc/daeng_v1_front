import { WEEKDAYS } from "constants/date";

import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { ISelect } from "../select.type";
import * as S from "../styles";

interface IDayMultiCheck
  extends ISelect,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
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
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (watch(name) && watch(name).length <= 1) {
      setIsAvailable(false);
    }
  }, [watch(name)]);

  const handleTouch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked && !isAvailable) {
      e.preventDefault();
      e.stopPropagation();
      setValue(name, [e.target.value]);
    } else {
      setIsAvailable(true);
    }
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
              {...register(`${name}`, { required: isRequired, onChange: handleTouch })}
              value={day}
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
