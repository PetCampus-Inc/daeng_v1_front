import { handlePostAdminForm } from "apis/school.api";
import { useMutation } from "@tanstack/react-query";

import type { IRequestAdminEnrollment } from "types/School.type";

export const useFormMutation = () => {
  const mutateForm = useMutation({
    mutationFn: (enrollmentData: IRequestAdminEnrollment) => handlePostAdminForm(enrollmentData),
    throwOnError: true
  });

  return mutateForm.mutate;
};
