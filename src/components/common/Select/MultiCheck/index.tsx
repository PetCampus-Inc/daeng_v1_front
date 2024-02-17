import { useFormContext } from "react-hook-form";
import { ISelect } from "../select.type";
import * as S from "../styles";
import { useEffect, useState } from "react";

interface IMulticheck extends ISelect, Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  radiosText: string[];
  defaultSelect?: string;
  isRequired?: boolean;
  isPreviewMode?: boolean;
}

const MultiCheck = ({
  radiosText,
  name,
  disabled,
  defaultSelect,
  isRequired = false,
  isPreviewMode = false,
  ...props
}: IMulticheck) => {
  const { register, watch, setValue } = useFormContext();
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (watch(name) && watch(name).length <= 1) {
      setIsAvailable(false);
    }
  }, [watch(name)]);

  const handleTouch = (e: any) => {
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
      <S.RadioContainer>
        {radiosText.map((text: string) => (
          <div style={{ width: "100%" }} key={text}>
            <S.StyledInput
              id={text}
              type="checkbox"
              {...register(`${name}`, { required: isRequired, onChange: handleTouch })}
              value={text}
              disabled={disabled}
              defaultChecked={defaultSelect === text}
              className={isPreviewMode ? "preview" : ""}
              {...props}
            />
            <S.StyledLabel htmlFor={text}>{text}</S.StyledLabel>
          </div>
        ))}
      </S.RadioContainer>
    </S.Container>
  );
};

export default MultiCheck;
