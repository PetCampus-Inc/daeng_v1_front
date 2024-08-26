import { PATH } from "constants/path";
import { RELATION_DATA } from "constants/relation";

import ArrowRightSquare from "assets/svg/arrow-right-square-icon";
import { IMemberInfo } from "types/member/main.types";

import * as S from "./styles";

interface MemberInfoProps {
  data: IMemberInfo;
  memberId: string;
}

const MemberProfile = ({ data, memberId }: MemberInfoProps) => {
  return (
    <S.ProfileWrapper>
      <S.ProfileBox>
        <S.ProfileImage src={`${data.memberProfileUri}`} alt="member-image" />
      </S.ProfileBox>
      <S.ProfileDetail>
        <S.DetailItem>
          <S.GotoInfoButton to={PATH.MEMBER_MY_INFO_PAGE(memberId)}>
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
