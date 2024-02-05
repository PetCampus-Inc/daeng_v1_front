import * as S from "../styles";
import { useFormContext } from "react-hook-form";
import { ISelect } from "../select.type";
import { WEEKDAYS } from "constants/date";

interface IDayMultiCheck extends ISelect {
  openDays: string[];
}

// 요일 복수 선택
const DayMultiCheck = ({ id, caption, openDays }: IDayMultiCheck) => {
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
              {...register(`${id}`)}
              value={day}
              disabled={!openDays.includes(day)}
            />
            <S.StyledLabel htmlFor={day}>{day}</S.StyledLabel>
          </div>
        ))}
      </S.RadioContainer>
    </S.Container>
  );
};

export default DayMultiCheck;
