import ArrowRightIcon from "assets/svg/arrow-right-icon";
import { Flex } from "components/common";

import * as S from "./styles";

import type { IOwnerInfo } from "types/admin/mypage.types";

interface PrincipalInfoProps {
  data: IOwnerInfo;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  profileUri: string;
}

const PrincipalProfile = ({ data, setIsEditing, isEditing, profileUri }: PrincipalInfoProps) => {
  return (
    <>
      <S.ProfileWrapper>
        <S.ProfileImageWrap>
          <S.Image src={profileUri} />
        </S.ProfileImageWrap>
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
