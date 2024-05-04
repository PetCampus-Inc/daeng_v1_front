import { PATH } from "constants/path";

import ArrowRightSquare from "assets/svg/arrow-right-square-icon";
import { IMemberInfo } from "types/member/home.types";

import * as S from "./styles";

interface MemberInfoProps {
  data: IMemberInfo;
}

const MemberProfile = ({ data }: MemberInfoProps) => {
  console.log(data);
  return (
    <S.ProfileWrapper>
      <S.ProfileImage
        src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="member-image"
      />
      <S.ProfileDetail>
        <S.DetailItem>
          <S.GotoInfoButton to={PATH.MEMBER_MY_INFO_PAGE}>
            <S.Text className="name">뽀뽀의 언니</S.Text>
            <ArrowRightSquare />
          </S.GotoInfoButton>
          <S.Text className="number">박유빈</S.Text>
        </S.DetailItem>
      </S.ProfileDetail>
    </S.ProfileWrapper>
  );
};

export default MemberProfile;
