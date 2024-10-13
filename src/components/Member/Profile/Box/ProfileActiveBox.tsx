import GalleryBasicIcon from "assets/svg/gallery-basic-icon";

import * as S from "../styles";

interface ProfileActiveBoxProps {
  htmlFor: string;
  onClick?: () => void;
}

const ProfileActiveBox = ({ htmlFor, onClick }: ProfileActiveBoxProps) => {
  return (
    <S.ActiveBox htmlFor={htmlFor} onClick={onClick} className="active">
      <GalleryBasicIcon className="GalleryIcon" />
      <S.BackDrop />
    </S.ActiveBox>
  );
};

export default ProfileActiveBox;
