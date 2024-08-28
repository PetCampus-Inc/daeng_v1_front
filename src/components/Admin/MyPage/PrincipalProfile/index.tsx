import ArrowRightIcon from "assets/svg/arrow-right-icon";
import { Flex } from "components/common";

import * as S from "./styles";

import type { IOwnerInfo } from "types/admin/mypage.types";

interface PrincipalInfoProps {
  data: IOwnerInfo;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
}

const PrincipalProfile = ({ data, setIsEditing, isEditing }: PrincipalInfoProps) => {
  return (
    <>
      <S.ProfileWrapper>
        <S.ProfileImage
          src={
            data.profileUri
              ? data.profileUri
              : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="dog-image"
        />
        {/* TODO: data.imageURL 없는 경우 기본 이미지 url로 연결 */}

        <S.ProfileDetail>
          <S.DetailItem>
            <S.PrimaryColorButton onClick={() => setIsEditing(!isEditing)}>
              프로필 수정
            </S.PrimaryColorButton>
            <Flex justify="center" align="center">
              <S.Text className="name">{data.adminName} 원장님</S.Text>
              <ArrowRightIcon colorScheme="darkBlack" w="24" />
            </Flex>
            <S.Text className="number">{data.phoneNumber}</S.Text>
            <S.Text className="id">{data.id}</S.Text>
          </S.DetailItem>
        </S.ProfileDetail>
      </S.ProfileWrapper>
    </>
  );
};

export default PrincipalProfile;
