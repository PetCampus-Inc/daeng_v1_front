import Text from "components/common/Text";
import useGetDogAndMemberDetail from "hooks/api/useGetDogAndMemberDetail";
import { ThemeConfig } from "styles/ThemeConfig";

import AboutDog from "./AboutDog";
import AboutOwner from "./AboutOwner";
import Memo from "./Memo";
import * as S from "./styles";
import { InnerContainer } from "../styles";

const DogInfo = () => {
  const { data } = useGetDogAndMemberDetail(2); //FIXME: 나영이꺼 머지되면 queryString에서 가져오기

  return (
    <InnerContainer>
      <AboutDog data={data.dogInfo} />

      <AboutOwner data={data.memberInfo} />

      <Memo memo={data.dogInfo.dogMemo} id={data.dogInfo.dogId} />

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
    </InnerContainer>
  );
};

export default DogInfo;
