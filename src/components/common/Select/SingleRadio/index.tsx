import { useFormContext } from "react-hook-form";

import * as S from "../styles";

import type { ISelect } from "../select.type";

interface ISingleRadio extends ISelect {
  radiosText: string[];
  disabled?: boolean;
  defaultSelect?: string;
  isPreviewMode?: boolean;
  isRequired?: boolean;
  preventDefaultClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const SingleRadio = ({
  name,
  caption,
  radiosText,
  disabled = false,
  isRequired = false,
  defaultSelect,
  isPreviewMode,
  preventDefaultClick
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
              {...register(name, { required: isRequired })}
              value={text}
              disabled={disabled}
              defaultChecked={defaultSelect === text}
              className={isPreviewMode ? "preview" : ""}
              onClick={preventDefaultClick}
            />
            <S.StyledLabel htmlFor={text + name}>{text}</S.StyledLabel>
          </div>
        ))}
      </S.RadioContainer>
    </S.Container>
  );
};
export default SingleRadio;
