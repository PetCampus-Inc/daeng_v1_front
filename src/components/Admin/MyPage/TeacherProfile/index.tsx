import ArrowRightIcon from "assets/svg/arrow-right-icon";
import { Flex } from "components/common";

import * as S from "./styles";

import type { ITeacherInfo } from "types/admin/mypage.types";
import { useAdminInfo } from "hooks/common/useAdminInfo";

interface TeacherInfoProps {
  data: ITeacherInfo;
  profileUri: string;
  onEdit: () => void;
}

const TeacherProfile = ({ data, profileUri, onEdit }: TeacherInfoProps) => {
  const { adminName, phoneNumber } = useAdminInfo();

  return (
    <>
      <S.ProfileWrapper>
        <S.ProfileImageWrap>
          <S.Image src={profileUri} />
        </S.ProfileImageWrap>

        <S.ProfileDetail>
          <S.DetailItem>
            <S.PrimaryColorButton onClick={onEdit}>프로필 수정</S.PrimaryColorButton>
            <Flex justify="center" align="center" onClick={onEdit}>
              <S.Text className="name">{adminName} 선생님</S.Text>
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

export default TeacherProfile;
