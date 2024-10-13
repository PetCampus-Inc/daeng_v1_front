import { useEffect } from "react";
import { Control, useFieldArray } from "react-hook-form";

type TicketFieldArrayProps = {
  control: Control;
  fieldName: string;
  defaultValues: number[];
};

export function useTicketFieldArray({ control, fieldName, defaultValues }: TicketFieldArrayProps) {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: fieldName,
    shouldUnregister: false
  });

  useEffect(() => {
    if (fields.length === 0 && defaultValues.length > 0) {
      replace(defaultValues.map((value) => ({ value })));
    }
  }, [fields.length, replace, defaultValues]);

  return { fields, append, remove };
}
