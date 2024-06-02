import BackgroundButton from "components/common/Button/BackgroundButton";

import * as S from "./styles";

const SaveProfilButton = () => {
  return (
    <S.SavaProfileButton>
      <BackgroundButton backgroundColor="transparent" disabled>
        프로필 완성하기
      </BackgroundButton>
    </S.SavaProfileButton>
  );
};

export default SaveProfilButton;
