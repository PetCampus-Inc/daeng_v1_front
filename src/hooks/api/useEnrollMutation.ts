import { handlePostIEnrollment } from "apis/school.api";
import { useMutation } from "@tanstack/react-query";

import type { IRequestEnrollment } from "types/School.type";

export const useEnrollMutation = () => {
  const enrollMutation = useMutation({
    mutationFn: (enrollmentData: IRequestEnrollment) => handlePostIEnrollment(enrollmentData),
    throwOnError: true
  });

  return enrollMutation.mutate;
};
