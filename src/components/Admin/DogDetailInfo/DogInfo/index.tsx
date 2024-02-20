import Text from "components/common/Text";
import * as S from "./styles";
import { ThemeConfig } from "styles/ThemeConfig";
import useGetDogDetail from "hooks/api/useGetDogDetail";
import AboutDog from "./AboutDog";
import AboutOwner from "./AboutOwner";
import Memo from "./Memo";

const DogInfo = () => {
  const { dogDetail } = useGetDogDetail();

  return (
    <S.Container>
      <AboutDog />

      <AboutOwner />

      <Memo />

      <S.AlbumWrapper>
        <Text text="사진 앨범" color={ThemeConfig.colors.darkBlack} size="1.1rem" weight="bold" />
        <S.Albums>
          {/* 사진이 있는경우 앨범 없을 경우 텍스트 */}
          <Text
            text="앨범에 등록된 사진이 없습니다"
            color={ThemeConfig.colors.gray_3}
            size="0.9rem"
          />
        </S.Albums>
      </S.AlbumWrapper>
    </S.Container>
  );
};

export default DogInfo;
