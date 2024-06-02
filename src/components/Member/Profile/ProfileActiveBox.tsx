import GalleryBasicIcon from "assets/svg/gallery-basic-icon";

import * as S from "./styles";

const ProfileActiveBox = () => {
  return (
    <S.ActiveBox className="active">
      <GalleryBasicIcon className="GalleryIcon" />
      <S.BackDropBorder />
      <S.BackDrop />
    </S.ActiveBox>
  );
};

export default ProfileActiveBox;
