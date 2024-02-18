import { useFormContext } from "react-hook-form";
import type { ISelect } from "../select.type";
import * as S from "../styles";

interface ISingleRadio extends ISelect {
  radiosText: string[];
  disabled?: boolean;
  defaultSelect?: string;
  isPreviewMode?: boolean;
}

const SingleRadio = ({
  name,
  caption,
  radiosText,
  disabled = false,
  defaultSelect,
  isPreviewMode
}: ISingleRadio) => {
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
              defaultChecked={defaultSelect === text}
              className={isPreviewMode ? "preview" : ""}
            />
            <S.StyledLabel htmlFor={text + name}>{text}</S.StyledLabel>
          </div>
        ))}
      </S.RadioContainer>
    </S.Container>
  );
};
export default SingleRadio;
