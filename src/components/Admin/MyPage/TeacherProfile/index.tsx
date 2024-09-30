import ArrowRightIcon from "assets/svg/arrow-right-icon";
import { Flex } from "components/common";

import * as S from "./styles";

import type { ITeacherInfo } from "types/admin/mypage.types";

interface TeacherInfoProps {
  data: ITeacherInfo;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  profileUri: string;
}

const TeacherProfile = ({ data, profileUri, setIsEditing, isEditing }: TeacherInfoProps) => {
  return (
    <>
      <S.ProfileWrapper>
        <S.ProfileImageWrap>
          <S.Image src={profileUri} />
        </S.ProfileImageWrap>

        <S.ProfileDetail>
          <S.DetailItem>
            <S.PrimaryColorButton onClick={() => setIsEditing(!isEditing)}>
              프로필 수정
            </S.PrimaryColorButton>
            <Flex justify="center" align="center">
              <S.Text className="name">{data.adminName} 선생님</S.Text>
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

export default TeacherProfile;
