import Chat from "assets/svg/chat";
import { SmallButton } from "components/common/Button/Templates";
import { useNavigate, useSearchParams } from "react-router-dom";

import * as S from "./styles";

const DogInfoBox = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Image
        src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="dog-image"
      />
      <span>{searchParams.get("dog_name")}</span>
      <SmallButton onClick={() => navigate("/admin/chat")} leftAddon={<Chat />} gap={8}>
        채팅하기
      </SmallButton>
    </S.Container>
  );
};

export default DogInfoBox;
