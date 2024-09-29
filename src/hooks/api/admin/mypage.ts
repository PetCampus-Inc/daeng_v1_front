import { routes } from "constants/path";

import { useMutation } from "@tanstack/react-query";
import {
  handleDeleteOwner,
  handleDeleteTeacher,
  updateAdminProfile,
  handlePostSchoolResigned,
  handleSchoolInfoEdit
} from "apis/admin/mypage.api";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { adminInfoState } from "store/admin";
import showToast from "utils/showToast";

//원장 프로필 수정
export const useAdminProfileUpdate = () => {
  const setAdmin = useSetRecoilState(adminInfoState);

  const { mutate } = useMutation({
    mutationFn: updateAdminProfile,
    onSuccess: (_, { adminName, phoneNumber, imageUrl }) => {
      setAdmin((prev) => ({
        ...prev,
        adminName,
        phoneNumber,
        profileUri: imageUrl
      }));

      showToast("수정 완료되었습니다", "bottom");
    },
    throwOnError: true
  });
  return { updateAdminProfileMutate: mutate };
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
