import ArrowRightSquare from "assets/svg/arrow-right-square-icon";

import * as S from "./styles";

// TODO API 데이터에 따라 타입 수정 필요
// interface MemberInfoProps {
//   data: ITeacherInfo;
// }

const MemberProfile = () => {
  return (
    <>
      <S.ProfileWrapper>
        <S.ProfileImage
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="member-image"
        />

        <S.ProfileDetail>
          <S.DetailItem>
            <S.GotoInfoButton>
              <S.Text className="name">뽀뽀의 언니</S.Text>
              <ArrowRightSquare />
            </S.GotoInfoButton>
            <S.Text className="number">박유빈</S.Text>
          </S.DetailItem>
        </S.ProfileDetail>
      </S.ProfileWrapper>
    </>
  );
};

export default MemberProfile;
