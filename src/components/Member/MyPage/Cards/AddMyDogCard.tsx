import AddCIcon from "assets/svg/add-c-icon";

import * as S from "./styles";

const AddMyDogCard = () => {
  return (
    <S.AddMyDogCard role="button">
      <AddCIcon className="addIcon" />
      <S.AddDogButton>강아지 추가하기</S.AddDogButton>
    </S.AddMyDogCard>
  );
};

export default AddMyDogCard;
