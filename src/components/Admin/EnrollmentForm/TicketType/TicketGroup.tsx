import CloseIcon from "assets/svg/x-circle-icon";
import { Box, Flex } from "components/common";
import { Controller } from "react-hook-form";

import * as Styled from "./styles";

import type { ExtendedFieldArrayWithId } from "./types";

interface TicketGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  fields: ExtendedFieldArrayWithId[];
  remove: (index: number) => void;
  suffix: string;
}

export function TicketGroup({ name, fields, remove, suffix, ...props }: TicketGroupProps) {
  return (
    <Flex width="full" gap={12}>
      {fields.map((item, index) => (
        <Box flex={1} position="relative" key={item.id}>
          <Controller
            name={`${name}.${item.id}.value`}
            render={({ field }) => (
              <Styled.HiddenInput
                {...props}
                {...field}
                id={`${name}-${item.id}`}
                checked={!!item.value}
                type="radio"
              />
            )}
          />
          <Styled.Item htmlFor={`${name}-${item.id}`}>{item.value + suffix}</Styled.Item>
          <Styled.DeleteButton type="button" onClick={() => remove(index)} aria-label="삭제">
            <CloseIcon />
          </Styled.DeleteButton>
        </Box>
      ))}
    </Flex>
  );
}
