import { routes } from "constants/path";

import { useMutation } from "@tanstack/react-query";
import {
  handleDeleteOwner,
  handleDeleteTeacher,
  handleOwnerProfileEdit,
  handlePostSchoolResigned,
  handleSchoolInfoEdit,
  handleTeacherProfileEdit
} from "apis/admin/mypage.api";
import { useNavigate } from "react-router-dom";
import { IAdminProfileEdit, ISchoolInfoEdit } from "types/admin/admin.types";
import showToast from "utils/showToast";

//원장 프로필 수정
export const useOwnerProfileEdit = () => {
  const navigate = useNavigate();
  const ownerProfileEditMutation = useMutation({
    mutationFn: (newData: IAdminProfileEdit) => handleOwnerProfileEdit(newData),
    onSuccess: () => {
      navigate(routes.admin.mypage.root);
      showToast("수정 완료되었습니다", "bottom");
    },
    throwOnError: true
  });
  return { ownerProfileEditMutation: ownerProfileEditMutation.mutate };
};

//선생님 프로필 수정
export const useTeacherProfileEdit = () => {
  const navigate = useNavigate();
  const teacherProfileEditMutation = useMutation({
    mutationFn: (newData: IAdminProfileEdit) => handleTeacherProfileEdit(newData),
    onSuccess: () => {
      navigate(routes.admin.mypage.root);
      showToast("수정 완료되었습니다", "bottom");
    },
    throwOnError: true
  });
  return { teacherProfileEditMutation: teacherProfileEditMutation.mutate };
};

//원장 유치원 정보 수정
export const useSchoolInfoEdit = () => {
  const navigate = useNavigate();
  const schoolInfoEditMutation = useMutation({
    mutationFn: handleSchoolInfoEdit,
    onSuccess: () => {
      navigate(routes.admin.mypage.root);
      showToast("유치원 정보가 수정되었습니다", "bottom");
    },
    throwOnError: true
  });
  return { schoolInfoEditMutation: schoolInfoEditMutation.mutate };
};

//선생님 유치원 끊기
export const useSchoolResigned = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => handlePostSchoolResigned(),
    onSuccess: () => navigate(routes.admin.login.root)
  });

  return { mutateSchoolResigned: mutate };
};

//원장 탈퇴
export const useDeleteOwner = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => handleDeleteOwner(),
    onSuccess: () => navigate(routes.admin.mypage.deleteComplete.root)
  });

  return { mutateDeleteOwner: mutate };
};

//선생님 탈퇴
export const useDeleteTeacher = () => {
  const { mutate } = useMutation({
    mutationFn: handleDeleteTeacher
  });

  return { mutateDeleteTeacher: mutate };
};
