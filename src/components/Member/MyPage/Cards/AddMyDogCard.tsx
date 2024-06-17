import { PATH } from "constants/path";

import AddCIcon from "assets/svg/add-c-icon";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { memberEnrollmentDogDetailAtom } from "store/member";

import * as S from "./styles";

const AddMyDogCard = () => {
  const navigate = useNavigate();
  const { memberId } = useParams();
  const setMemberDogInfo = useSetRecoilState(memberEnrollmentDogDetailAtom);

  // 유치원 재 등록할 경우 남아 있는 MemberDogInfo 삭제를 위해
  const handleResetMemberDogInfo = () => {
    setMemberDogInfo(null);
  };

  return (
    <S.AddMyDogCard
      role="button"
      onClick={() => {
        navigate(PATH.MEMBER_MY_SCHOOL_SEARCH(String(memberId)));
        handleResetMemberDogInfo();
      }}
    >
      <AddCIcon className="addIcon" />
      <S.AddDogButton>강아지 추가하기</S.AddDogButton>
    </S.AddMyDogCard>
  );
};

export default AddMyDogCard;
