import CloseIcon from "assets/svg/x-circle-icon";
import { Box, Flex } from "components/common";
import { useMemo } from "react";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";

import * as Styled from "./styles";

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

export function TicketGroup({
  control,
  name,
  fields,
  remove,
  suffix,
  ...props
}: EditableRadioGroupProps) {
  const sortedFields = useMemo(() => {
    return [...fields].sort((a, b) => (a.value ?? 0) - (b.value ?? 0));
  }, [fields]);

  return (
    <Flex width="full" gap={12}>
      {sortedFields.map((item) => {
        // 원본 fields 배열에서 현재 item의 인덱스를 찾음
        const originalIndex = fields.findIndex((x) => x.id === item.id);

        return (
          <Box flex={1} position="relative" key={item.id}>
            <Controller
              shouldUnregister={false}
              control={control}
              name={`${name}.${originalIndex}.value`}
              render={({ field }) => (
                <Styled.HiddenInput
                  {...props}
                  {...field}
                  id={`${name}-${originalIndex}`}
                  checked={field.value === item.value}
                  type="radio"
                />
              )}
            />
            <Styled.Item htmlFor={`${name}-${originalIndex}`}>{item.value + suffix}</Styled.Item>
            <Styled.DeleteButton
              type="button"
              onClick={() => remove(originalIndex)}
              aria-label="삭제"
            >
              <CloseIcon />
            </Styled.DeleteButton>
          </Box>
        );
      })}
    </Flex>
  );
}
