import * as S from "./styles";

import type { ITeacherInfo } from "types/admin/mypage.types";

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
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="dog-image"
        />
        {/* TODO: BE 확인 - imageUrl이 스키마에 없음 */}

        <S.ProfileDetail>
          <S.DetailItem>
            <S.PrimaryColorButton onClick={() => setIsEditing(!isEditing)}>
              프로필 수정
            </S.PrimaryColorButton>
            <S.Text className="name">{data.adminName} 선생님</S.Text>
            <S.Text className="number">{data.phoneNumber}</S.Text>
            <S.Text className="id">{data.id}</S.Text>
          </S.DetailItem>
        </S.ProfileDetail>
      </S.ProfileWrapper>
    </>
  );
};

export default TeacherProfile;
