import { routes } from "constants/path";

import { useMutation } from "@tanstack/react-query";
import { handleOwnerProfileEdit } from "apis/admin/mypage.api";
import { useNavigate } from "react-router-dom";
import { IOwnerProfileEdit } from "types/admin/admin.types";
import showToast from "utils/showToast";

export const useOwnerProfileEdit = () => {
  const navigate = useNavigate();
  const ownerProfileEditMutation = useMutation({
    mutationFn: (newData: IOwnerProfileEdit) => handleOwnerProfileEdit(newData),
    onSuccess: () => {
      navigate(routes.admin.mypage.root);
      showToast("수정 완료되었습니다", "bottom");
    },
    throwOnError: true
  });
  return { ownerProfileEditMutation: ownerProfileEditMutation.mutate };
};
