import { useFormContext } from "react-hook-form";
import { ISelect } from "../select.type";
import * as S from "../styles";

interface IMulticheck extends ISelect, Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  radiosText: string[];
}

const MultiCheck = ({ radiosText, name, disabled, ...props }: IMulticheck) => {
  const { register } = useFormContext();

  return (
    <S.Container>
      <S.RadioContainer>
        {radiosText.map((text: any) => (
          <div style={{ width: "100%" }} key={text}>
            <S.StyledInput
              id={text}
              type="checkbox"
              {...register(`${name}`)}
              value={text}
              disabled={disabled}
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
