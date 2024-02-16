import * as S from "../styles";
import { useFormContext } from "react-hook-form";
import { ISelect } from "../select.type";
import { WEEKDAYS } from "constants/date";

interface IDayMultiCheck
  extends ISelect,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  openDays?: string[];
}

// 요일 복수 선택
const DayMultiCheck = ({ name, caption, openDays, disabled = false, ...props }: IDayMultiCheck) => {
  const { register } = useFormContext();

  return (
    <S.Container>
      {caption && <S.Caption>{caption}</S.Caption>}
      <S.RadioContainer>
        {WEEKDAYS.map((day) => (
          <div style={{ width: "100%" }} key={day}>
            <S.StyledInput
              id={day}
              type="checkbox"
              {...register(`${name}`)}
              value={day}
              disabled={disabled && !openDays?.includes(day)}
              {...props}
            />
            <S.StyledLabel htmlFor={day} className="policyPage">
              {day}
            </S.StyledLabel>
          </div>
        ))}
      </S.RadioContainer>
    </S.Container>
  );
};

export default DayMultiCheck;
