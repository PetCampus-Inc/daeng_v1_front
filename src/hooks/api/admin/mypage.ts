import { PATH } from "constants/path";

import { useMutation } from "@tanstack/react-query";
import { handleOwnerProfileEdit } from "apis/admin/mypage.api";
import { useNavigate } from "react-router-dom";
import showToast from "utils/showToast";

export const useOwnerProfileEdit = () => {
  const navigate = useNavigate();
  const ownerProfileEditMutation = useMutation({
    mutationFn: handleOwnerProfileEdit,
    onSuccess: () => {
      navigate(PATH.ADMIN_MY_PAGE);
      showToast("수정 완료되었습니다", "bottom");
    }
  });
};
