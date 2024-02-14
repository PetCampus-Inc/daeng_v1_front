import { useEffect } from "react";
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

  // 초기값 설정
  useEffect(() => {
    if (fields.length === 0) {
      append(
        defaultValues.map((value) => ({
          value: value.toString(),
          label: `${value}${fieldName.includes("Round") ? "회" : "주"}`
        }))
      );
    }
    // eslint-disable-next-line
  }, []);

  return { fields, append, remove };
};

export default useTicketFieldArray;
