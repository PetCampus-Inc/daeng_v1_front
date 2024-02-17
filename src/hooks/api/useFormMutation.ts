import { handlePostAdminForm } from "apis/school.api";
import { useMutation } from "@tanstack/react-query";

import type { IRequestForm } from "types/School.type";

export const useFormMutation = () => {
  const mutateForm = useMutation({
    mutationFn: (enrollmentData: IRequestForm) => handlePostAdminForm(enrollmentData),
    throwOnError: true
  });

  return mutateForm.mutate;
};
