import Chat from "assets/svg/chat";
import { SmallButton } from "components/common/Button/Templates";
import { useNavigate } from "react-router-dom";

import * as S from "./styles";

interface DogInfoBoxProps {
  dogName: string;
  profileUri: string;
}

const DogInfoBox = ({ dogName, profileUri }: DogInfoBoxProps) => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Image src={profileUri} alt="dog-image" />
      <span>{dogName}</span>
      <SmallButton onClick={() => navigate("/admin/chat")} leftAddon={<Chat />} gap={8}>
        채팅하기
      </SmallButton>
    </S.Container>
  );
};

export default DogInfoBox;
