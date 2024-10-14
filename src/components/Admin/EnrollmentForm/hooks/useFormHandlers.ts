import { getFieldStep } from "constants/step";

import { type FieldValues, type FieldErrors, type UseFormSetFocus } from "react-hook-form";

export function useFormHandlers(
  onNextStep: (formInfo: FieldValues) => void,
  openAlertPopup: (cb: () => void, step: number) => void,
  setFocus: UseFormSetFocus<FieldValues>,
  setStep: (step: number) => void
) {
  const onSubmit = (data: FieldValues) => {
    onNextStep?.(data);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
    const firstErrorField = Object.keys(errors)[0];
    const step = getFieldStep({ field: firstErrorField, enable: true });
    if (step !== undefined) {
      setStep(step);
      openAlertPopup(() => setFocus(firstErrorField, { shouldSelect: true }), step);
    }
  };

  return { onSubmit, onInvalid };
}
