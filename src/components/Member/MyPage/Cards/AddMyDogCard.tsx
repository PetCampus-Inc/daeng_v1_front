import { routes } from "constants/path";

import AddCIcon from "assets/svg/add-c-icon";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { dogIdState } from "store/member";

import * as S from "./styles";

const AddMyDogCard = () => {
  const navigate = useNavigate();
  const setDogId = useSetRecoilState(dogIdState);

  return (
    <S.AddMyDogCard
      role="button"
      onClick={() => {
        navigate(routes.member.mypage.enrollment.root);
        setDogId(0); // dogId 초기화
      }}
    >
      <AddCIcon className="addIcon" />
      <S.AddDogButton>강아지 추가하기</S.AddDogButton>
    </S.AddMyDogCard>
  );
};

export default AddMyDogCard;
