import { ISelect } from "../select.type";
import { useFormContext } from "react-hook-form";
import * as S from "../styles";

interface ISingleRadio extends ISelect {
  radiosText: string[];
  disabled?: boolean;
}

const SingleRadio = ({ name, caption, radiosText, disabled = false }: ISingleRadio) => {
  const { register } = useFormContext();

  return (
    <S.Container>
      {caption && <S.Caption>{caption}</S.Caption>}
      <S.RadioContainer>
        {radiosText.map((text) => (
          <div style={{ width: "100%" }} key={text}>
            <S.StyledInput
              id={text + name}
              type="radio"
              {...register(name)}
              value={text}
              disabled={disabled}
            />
            <S.StyledLabel htmlFor={text + name} className={disabled ? "disabled" : ""}>
              {text}
            </S.StyledLabel>
          </div>
        ))}
      </S.RadioContainer>
    </S.Container>
  );
};
export default SingleRadio;
