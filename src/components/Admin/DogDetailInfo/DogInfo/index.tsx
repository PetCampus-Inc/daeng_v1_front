import Text from "components/common/Text";
import useGetDogAndMemberDetail from "hooks/api/useGetDogAndMemberDetail";
import { useLocation } from "react-router-dom";
import { ThemeConfig } from "styles/ThemeConfig";

import AboutDog from "./AboutDog";
import AboutOwner from "./AboutOwner";
import Memo from "./Memo";
import * as S from "./styles";
import { InnerContainer } from "../styles";

const DogInfo = () => {
  const dogId = useLocation().pathname.split("/").pop();
  const { data, refetch } = useGetDogAndMemberDetail(Number(dogId));

  return (
    <InnerContainer>
      <AboutDog data={data.dogInfo} />

      <AboutOwner data={data.memberInfo} />

      <Memo memo={data.dogInfo.dogMemo} id={data.dogInfo.dogId} refetch={refetch} />

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
