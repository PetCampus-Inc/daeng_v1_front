import CloseIcon from "assets/svg/x-circle-icon";

import * as S from "./styles";

interface AvatarProps {
  id: number;
  name: string;
  handleClick: (id: number) => void;
  src?: string;
  size?: "sm" | "md";
  color?: "br" | "gray";
}

const Avatar = ({ id, name, src, handleClick, size = "sm", color = "gray" }: AvatarProps) => {
  return (
    <S.Avatar key={id}>
      <S.AvatarWrapper size={size}>
        <S.AvatarImgWrapper size={size}>
          <S.Image
            src={
              src
                ? src
                : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={name}
          />
        </S.AvatarImgWrapper>
        <S.Name>{name}</S.Name>
        <S.RemoveButton type="button" onClick={() => handleClick(id)} color={color}>
          <CloseIcon />
        </S.RemoveButton>
      </S.AvatarWrapper>
    </S.Avatar>
  );
};

export default Avatar;
