import { routes } from "constants/path";

import NewSignUpIcon from "assets/svg/new-sign-up-icon";
import TeacherManagementIcon from "assets/svg/teacher-management-icon";
import NewEnrollmentFormBottomSheet from "components/Admin/SchoolManage/NewEnrollmentFormBottomSheet";
import useGetNewEnrollment from "hooks/api/useGetNewEnrollment";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useOverlay } from "hooks/common/useOverlay";
import { useNavigate } from "react-router-dom";
import showToast from "utils/showToast";

import * as S from "./styles";

const MenuCard = () => {
  const { schoolId } = useAdminInfo();
  const { refetch } = useGetNewEnrollment(schoolId);

  const navigate = useNavigate();
  const overlay = useOverlay();

  /** 신규가입 메뉴 클릭*/
  const handleNewEnrollment = async () => {
    try {
      const { data } = await refetch();

      if (data?.simpleSchoolFormList.length === 0) {
        overlay.open(({ isOpen, close }) => (
          <NewEnrollmentFormBottomSheet
            isOpen={isOpen}
            close={close}
            onConfirm={handleCreateEnrollment}
          />
        ));
      } else navigate(routes.admin.school.enrollment.root);
    } catch (error) {
      showToast("정보를 불러오는 데 실패했습니다. 다시 시도해주세요", "bottom");
    }
  };

  /** 선생님 관리 메뉴 클릭 */
  const handleTeacherManage = () => navigate(routes.admin.school.teacher.root);

  /** 가입신청서 신규 등록 */
  const handleCreateEnrollment = () => navigate(routes.admin.school.enrollment.new.root);

  return (
    <S.CardContainer>
      <S.Card onClick={handleNewEnrollment}>
        신규가입
        <S.IconWrapper>
          <NewSignUpIcon />
        </S.IconWrapper>
      </S.Card>
      <S.Card onClick={handleTeacherManage}>
        선생님 관리
        <S.IconWrapper>
          <TeacherManagementIcon />
        </S.IconWrapper>
      </S.Card>
    </S.CardContainer>
  );
};

export default MenuCard;
