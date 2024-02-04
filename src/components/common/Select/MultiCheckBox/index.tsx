import * as S from "../styles";
import Text from "components/common/Text";
import { useFormContext } from "react-hook-form";
import { ISelect } from "../select.type";

interface IMultiCheckbox extends ISelect {
  openDays: string[];
}

const MultiCheckbox = ({ title, caption, badgeText, badgeType, openDays }: IMultiCheckbox) => {
  const { register } = useFormContext();
  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <S.Container>
      <S.TitleContainer>
        <Text text={title} />
        {/* <Badge text={badgeText} type={badgeType}/>  */}
      </S.TitleContainer>
      {caption && <S.Caption>{caption}</S.Caption>}
      <S.RadioContainer>
        {weekdays.map((day) => (
          <div style={{ width: "100%" }} key={day}>
            <S.StyledInput
              id={day}
              type="checkbox"
              {...register(`${title}`)}
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

export default MultiCheckbox;
