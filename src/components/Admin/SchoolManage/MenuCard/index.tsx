import NewSignUpIcon from "assets/svg/new-sign-up-icon";
import * as S from "./styles";
import TeacherManagementIcon from "assets/svg/teacher-management-icon";
import { useEffect, useState } from "react";
import useGetNewEnrollment from "hooks/api/useNewGetEnrollment";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { newEnrollmentListAtom } from "store/admin";

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
        navigate("/admin/schoolManage/newEnrollment");
      })
      .catch((error) => {
        // TODO: 에러 토스트띄우기
      });
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
