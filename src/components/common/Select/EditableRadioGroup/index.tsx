import CloseIcon from "assets/svg/x-circle-icon";
import { useMemo } from "react";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";

import * as S from "../styles";

export interface ExtendedFieldArrayWithId extends FieldArrayWithId {
  value?: number;
}

interface EditableRadioGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control;
  name: string;
  fields: ExtendedFieldArrayWithId[];
  remove: (index: number) => void;
  suffix: string;
}

const EditableRadioGroup = ({
  control,
  name,
  fields,
  remove,
  suffix,
  ...props
}: EditableRadioGroupProps) => {
  const sortedFields = useMemo(() => {
    return [...fields].sort((a, b) => (a.value ?? 0) - (b.value ?? 0));
  }, [fields]);

  return (
    <S.RadioGroupContainer>
      {sortedFields.map((item) => {
        // 원본 fields 배열에서 현재 item의 인덱스를 찾음
        const originalIndex = fields.findIndex((x) => x.id === item.id);

        return (
          <S.RadioWrapper key={item.id}>
            <Controller
              name={`${name}.${originalIndex}.value`}
              control={control}
              render={({ field }) => (
                <S.StyledInput
                  {...field}
                  {...props}
                  id={`${name}-${originalIndex}`}
                  checked={field.value === item.value}
                  type="radio"
                />
              )}
            />
            <S.StyledLabel htmlFor={`${name}-${originalIndex}`}>
              {item.value + suffix}
            </S.StyledLabel>
            <S.DeleteButton type="button" onClick={() => remove(originalIndex)} aria-label="삭제">
              <CloseIcon />
            </S.DeleteButton>
          </S.RadioWrapper>
        );
      })}
    </S.RadioGroupContainer>
  );
};
export default EditableRadioGroup;
