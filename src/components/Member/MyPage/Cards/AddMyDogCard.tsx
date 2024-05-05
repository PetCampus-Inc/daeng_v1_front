import { PATH } from "constants/path";

import AddCIcon from "assets/svg/add-c-icon";
import { useNavigate } from "react-router-dom";

import * as S from "./styles";

const AddMyDogCard = () => {
  const navigate = useNavigate();
  return (
    <S.AddMyDogCard role="button" onClick={() => navigate(PATH.MEMBER_MY_SCHOOL_SEARCH)}>
      <AddCIcon className="addIcon" />
      <S.AddDogButton>강아지 추가하기</S.AddDogButton>
    </S.AddMyDogCard>
  );
};

export default AddMyDogCard;
