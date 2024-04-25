import * as S from "./styles";

import type { IOwnerInfo } from "types/admin/mypage.type";

interface PrincipalInfoProps {
  data: IOwnerInfo;
}

const PrincipalProfile = ({ data }: PrincipalInfoProps) => {
  return (
    <>
      <S.ProfileWrapper>
        <S.ProfileImage
          src={
            data.imageUrl
              ? data.imageUrl
              : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="dog-image"
        />
        {/* TODO: data.imageURL 없는 경우 기본 이미지 url로 연결 */}

        <S.ProfileDetail>
          <S.DetailItem>
            <S.PrimaryColorButton>프로필 수정</S.PrimaryColorButton>
            <S.Text className="name">{data.adminName} 원장님</S.Text>
            <S.Text className="number">{data.phoneNumber}</S.Text>
            <S.Text className="id">{data.id}</S.Text>
          </S.DetailItem>
        </S.ProfileDetail>
      </S.ProfileWrapper>
    </>
  );
};

export default PrincipalProfile;
