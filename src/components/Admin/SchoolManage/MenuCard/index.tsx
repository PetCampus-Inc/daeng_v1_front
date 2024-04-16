import { PATH } from "constants/path";

import NewSignUpIcon from "assets/svg/new-sign-up-icon";
import TeacherManagementIcon from "assets/svg/teacher-management-icon";
import useGetNewEnrollment from "hooks/api/useGetNewEnrollment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { newEnrollmentListAtom } from "store/admin";
import showToast from "utils/showToast";

import * as S from "./styles";

const MenuCard = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpened, setIsOpened] = useState(false);
  const { refetch } = useGetNewEnrollment(2, 1); // FIXME: adminId, schoolId 로그인 정보에서 가져오기
  const setNewEnrollmentList = useSetRecoilState(newEnrollmentListAtom);

  const handleTouch = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  useEffect(() => {
    switch (activeIndex) {
      case 0:
        handleNewEnrollment();
        break;
      case 1:
        handleTeacherManage();
        break;
    }
  }, [activeIndex]);

  // 신규 가입 버튼 동작
  const handleNewEnrollment = () => {
    refetch()
      .then((data) => {
        if (!data) return;
        setNewEnrollmentList(data.data || null);
        if (data.data!.simpleSchoolFormList.length === 0) {
          setIsOpened(true);
          return;
        }
        navigate(PATH.ADMIN_SCHOOL_MANAGE);
      })
      .catch((error) => {
        showToast("정보를 불러오는 데 실패했습니다. 다시 시도해주세요", "bottom");
      });
  };

  // 선생님 관리 버튼 동작
  const handleTeacherManage = () => {
    navigate("teacher");
  };

  const menuCardItems = [
    { text: "신규가입", icon: <NewSignUpIcon /> },
    { text: "선생님 관리", icon: <TeacherManagementIcon /> }
  ];

  return (
    <S.CardContainer>
      {menuCardItems.map((menuItem, index) => (
        <S.Card
          onClick={() => handleTouch(index)}
          key={menuItem.text}
          className={index === activeIndex ? "active" : ""}
        >
          {menuItem.text}
          <S.IconWrapper>{menuItem.icon}</S.IconWrapper>
        </S.Card>
      ))}
    </S.CardContainer>
    // TODO : 캐러셀 모달 만들어주기
  );
};

export default MenuCard;
