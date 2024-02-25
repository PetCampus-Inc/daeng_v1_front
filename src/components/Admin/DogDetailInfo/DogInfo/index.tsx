import Text from "components/common/Text";
import * as S from "./styles";
import { ThemeConfig } from "styles/ThemeConfig";
import AboutDog from "./AboutDog";
import AboutOwner from "./AboutOwner";
import Memo from "./Memo";
import { InnerContainer } from "../styles";
import useGetDogAndMemberDetail from "hooks/api/useGetDogAndMemberDetail";

const DogInfo = () => {
  const { data, isLoading } = useGetDogAndMemberDetail(1);

  if (isLoading) return <div>로딩중</div>;

  return (
    <InnerContainer>
      <AboutDog data={data!.dogInfo} />

      <AboutOwner data={data!.memberInfo} />

      <Memo memo={data!.dogInfo.dogMemo} />

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
