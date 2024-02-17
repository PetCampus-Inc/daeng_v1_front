import * as S from "../styles";
import { useFormContext } from "react-hook-form";
import { ISelect } from "../select.type";
import { WEEKDAYS } from "constants/date";

interface IDayMultiCheck
  extends ISelect,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  openDays?: string[];
  defaultSelect?: string[];
  isPreviewMode?: boolean;
}

// 요일 복수 선택
const DayMultiCheck = ({
  name,
  caption,
  openDays,
  disabled = false,
  defaultSelect,
  isPreviewMode = false,
  ...props
}: IDayMultiCheck) => {
  const { register } = useFormContext();

  return (
    <S.Container>
      {caption && <S.Caption>{caption}</S.Caption>}
      <S.RadioContainer>
        {WEEKDAYS.map((day) => (
          <div style={{ width: "100%" }} key={day}>
            <S.DayCheckInput
              id={day}
              type="checkbox"
              {...register(`${name}`, { required: true })}
              value={day}
              defaultChecked={defaultSelect?.includes(day)}
              disabled={disabled ? disabled : openDays && !openDays?.includes(day)}
              className={openDays && openDays?.includes(day) ? "open-day" : ""}
              {...props}
            />
            <S.DayCheckLabel htmlFor={day} className={isPreviewMode ? " preview" : ""}>
              {day}
            </S.DayCheckLabel>
          </div>
        ))}
      </S.RadioContainer>
    </S.Container>
  );
};

export default DayMultiCheck;
