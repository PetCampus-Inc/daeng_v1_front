import { useFormContext } from "react-hook-form";
import { ISelect } from "../select.type";
import * as S from "../styles";

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
  const { register } = useFormContext();

  return (
    <S.Container>
      <S.RadioContainer>
        {radiosText.map((text: string) => (
          <div style={{ width: "100%" }} key={text}>
            <S.StyledInput
              id={text}
              type="checkbox"
              {...register(`${name}`, { required: isRequired })}
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
