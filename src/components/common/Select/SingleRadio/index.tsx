import { ISelect } from "../select.type";
import { useFormContext } from "react-hook-form";
import * as S from "../styles";

interface ISingleRadio extends ISelect {
  radiosText: string[];
}

const SingleRadio = ({ id, caption, radiosText }: ISingleRadio) => {
  const { register } = useFormContext();

  return (
    <S.Container>
      {caption && <S.Caption>{caption}</S.Caption>}
      <S.RadioContainer>
        {radiosText.map((text) => (
          <div style={{ width: "100%" }} key={text}>
            <S.StyledInput id={text} type="radio" {...register(`${id}`)} value={text} />
            <S.StyledLabel htmlFor={text}>{text}</S.StyledLabel>
          </div>
        ))}
      </S.RadioContainer>
    </S.Container>
  );
};
export default SingleRadio;
