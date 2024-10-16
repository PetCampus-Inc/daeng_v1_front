import { routes } from "constants/path";
import { RELATION_DATA } from "constants/relation";

import placeholderImg from "assets/images/placeholder-dog.png";
import ArrowRightSquare from "assets/svg/arrow-right-square-icon";
import { IMemberInfo } from "types/member/main.types";

import * as S from "./styles";

interface MemberInfoProps {
  data: IMemberInfo;
}

const MemberProfile = ({ data }: MemberInfoProps) => {
  return (
    <S.ProfileWrapper>
      <S.ProfileBox>
        <S.ProfileImage src={`${data.memberProfileUri ?? placeholderImg}`} alt="member-image" />
      </S.ProfileBox>
      <S.ProfileDetail>
        <S.DetailItem>
          <S.GotoInfoButton to={routes.member.mypage.profile.root}>
            <S.Text className="name">
              {data.memberNickName}의 {RELATION_DATA[data.relation]}
            </S.Text>
            <ArrowRightSquare />
          </S.GotoInfoButton>
          <S.Text className="number">{data.memberName}</S.Text>
        </S.DetailItem>
      </S.ProfileDetail>
    </S.ProfileWrapper>
  );
};

export default MemberProfile;
