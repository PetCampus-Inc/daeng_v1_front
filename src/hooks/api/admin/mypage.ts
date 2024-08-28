import { PATH } from "constants/path";

import { useMutation } from "@tanstack/react-query";
import {
  handleDeleteTeacher,
  handleOwnerProfileEdit,
  handlePostSchoolResigned
} from "apis/admin/mypage.api";
import { useNavigate } from "react-router-dom";
import { IOwnerProfileEdit } from "types/admin/admin.types";
import showToast from "utils/showToast";

//원장 프로필 수정
export const useOwnerProfileEdit = () => {
  const navigate = useNavigate();
  const ownerProfileEditMutation = useMutation({
    mutationFn: (newData: IOwnerProfileEdit) => handleOwnerProfileEdit(newData),
    onSuccess: () => {
      navigate(PATH.ADMIN_MY_PAGE);
      showToast("수정 완료되었습니다", "bottom");
    },
    throwOnError: true
  });
  return { ownerProfileEditMutation: ownerProfileEditMutation.mutate };
};

//선생님 유치원 끊기
export const useSchoolResigned = () => {
  const { mutate } = useMutation({
    mutationFn: handlePostSchoolResigned
  });

  return { mutateSchoolResigned: mutate };
};

//선생님 탈퇴
export const useDeleteTeacher = () => {
  const { mutate } = useMutation({
    mutationFn: handleDeleteTeacher
  });

  return { mutateDeleteTeacher: mutate };
};
