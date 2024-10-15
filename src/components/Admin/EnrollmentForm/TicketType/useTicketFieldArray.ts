import { useEffect } from "react";
import { type FieldValues, type UseFieldArrayReplace, useFieldArray } from "react-hook-form";

import type { ExtendedFieldArrayWithId } from "./types";

type TicketFieldArrayProps = {
  fieldName: string;
  defaultValues: number[];
};

export function useTicketFieldArray({ fieldName, defaultValues }: TicketFieldArrayProps) {
  const { fields, replace, remove } = useFieldArray({
    name: fieldName,
    shouldUnregister: false
  });

  useEffect(() => {
    if (fields.length === 0 && defaultValues.length > 0) {
      replace(defaultValues.map((value) => ({ value })));
    }
  }, [fields.length, replace, defaultValues]);

  const sortedAppend = (value: number) => appendSorted(value)(fields, replace);

  return { fields, append: sortedAppend, remove };
}

const appendSorted =
  (value: number) =>
  (fields: ExtendedFieldArrayWithId[], replace: UseFieldArrayReplace<FieldValues, string>) => {
    const newFields = [...fields, { value }].sort((a, b) => (a.value ?? 0) - (b.value ?? 0));
    replace(newFields);
  };
