import { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

export interface CommonDropdownProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  value: string;
  setValue: UseFormSetValue<FieldValues>;
  width: string;
}
