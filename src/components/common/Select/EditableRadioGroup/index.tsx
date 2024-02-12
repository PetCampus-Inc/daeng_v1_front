import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import CloseIcon from "assets/svg/close-icon";
import * as S from "../styles";

interface ExtendedFieldArrayWithId extends FieldArrayWithId {
  value?: string;
  label?: string;
}

interface EditableRadioGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control;
  name: string;
  fields: ExtendedFieldArrayWithId[];
  remove: (index: number) => void;
}

const EditableRadioGroup = ({
  control,
  name,
  fields,
  remove,
  ...props
}: EditableRadioGroupProps) => {
  return (
    <S.RadioGroupContainer>
      {fields.map((item, index) => (
        <S.RadioWrapper key={item.id}>
          <Controller
            name={`${name}.${index}.value`}
            control={control}
            render={({ field }) => (
              <S.StyledInput
                {...field}
                {...props}
                id={`${name}-${index}`}
                checked={true}
                type="radio"
              />
            )}
          />
          <S.StyledLabel htmlFor={`${name}-${index}`}>{item.label}</S.StyledLabel>
          <S.DeleteButton type="button" onClick={() => remove(index)} aria-label="삭제">
            <CloseIcon />
          </S.DeleteButton>
        </S.RadioWrapper>
      ))}
    </S.RadioGroupContainer>
  );
};

export default EditableRadioGroup;
