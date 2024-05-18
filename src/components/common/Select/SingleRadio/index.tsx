import { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";

import * as S from "../styles";

import type { ISelect } from "../select.type";

interface ISingleRadio extends ISelect {
  radiosText: string[];
  disabled?: boolean;
  defaultSelect?: string;
  isPreviewMode?: boolean;
  isRequired?: boolean;
}

const SingleRadio = ({
  name,
  caption,
  radiosText,
  disabled = false,
  isRequired = false,
  defaultSelect,
  isPreviewMode
}: ISingleRadio) => {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (defaultSelect) {
      setValue(name, defaultSelect);
    }
  }, [defaultSelect, name, setValue]);

  return (
    <S.Container>
      {caption && <S.Caption>{caption}</S.Caption>}
      <S.RadioContainer>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultSelect}
          rules={{ required: isRequired }}
          render={({ field }) => (
            <>
              {radiosText.map((text) => {
                const isChecked = field.value === text;
                return (
                  <div style={{ width: "100%" }} key={text}>
                    <S.StyledInput
                      id={text + name}
                      type="radio"
                      value={text}
                      disabled={disabled}
                      checked={isChecked}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={isPreviewMode ? "preview" : ""}
                    />
                    <S.StyledLabel htmlFor={text + name}>{text}</S.StyledLabel>
                  </div>
                );
              })}
            </>
          )}
        />
      </S.RadioContainer>
    </S.Container>
  );
};

export default SingleRadio;
