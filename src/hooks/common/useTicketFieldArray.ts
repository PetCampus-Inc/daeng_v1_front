import { Control, useFieldArray } from "react-hook-form";

type TicketFieldArrayProps = {
  control: Control;
  fieldName: string;
  defaultValues: number[];
};

const useTicketFieldArray = ({ control, fieldName, defaultValues }: TicketFieldArrayProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName
  });

  if (fields.length === 0 && defaultValues.length > 0) {
    append(defaultValues.map((value) => ({ value })));
  }

  return { fields, append, remove };
};

export default useTicketFieldArray;
