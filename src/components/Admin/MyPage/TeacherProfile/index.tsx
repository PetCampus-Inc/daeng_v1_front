import { Flex } from "components/common";
import * as S from "./styles";

import type { ITeacherInfo } from "types/admin/mypage.types";
import ArrowRightIcon from "assets/svg/arrow-right-icon";

interface TeacherInfoProps {
  data: ITeacherInfo;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
}

const TeacherProfile = ({ data, setIsEditing, isEditing }: TeacherInfoProps) => {
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
