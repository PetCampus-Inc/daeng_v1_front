import ArrowRightIcon from "assets/svg/arrow-right-icon";
import { Flex } from "components/common";

import * as S from "./styles";

import type { IOwnerInfo } from "types/admin/mypage.types";
import { useEffect } from "react";
import { useAdminInfo } from "hooks/common/useAdminInfo";

interface PrincipalInfoProps {
  data: IOwnerInfo;
  profileUri: string;
  onEdit?: () => void;
}

const PrincipalProfile = ({ data, profileUri, onEdit }: PrincipalInfoProps) => {
  const { adminName, phoneNumber } = useAdminInfo();

  return (
    <>
      <S.ProfileWrapper>
        <S.ProfileImageWrap>
          <S.Image src={profileUri} />
        </S.ProfileImageWrap>
        {/* TODO: data.imageURL 없는 경우 기본 이미지 url로 연결 */}

        <S.ProfileDetail>
          <S.DetailItem>
            <S.PrimaryColorButton onClick={onEdit}>프로필 수정</S.PrimaryColorButton>
            <Flex justify="center" align="center" onClick={onEdit}>
              <S.Text className="name">{adminName} 원장님</S.Text>
              <ArrowRightIcon size={24} colorScheme="darkBlack" />
            </Flex>
            <S.Text className="number">{phoneNumber}</S.Text>
            <S.Text className="id">{data.id}</S.Text>
          </S.DetailItem>
        </S.ProfileDetail>
      </S.ProfileWrapper>
    </>
  );
};

export default PrincipalProfile;
