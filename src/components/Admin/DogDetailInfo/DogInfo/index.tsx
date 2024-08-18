import { Text } from "components/common";
import { useGetDogDetail } from "hooks/api/admin/dogs";

import AboutDog from "./AboutDog";
import AboutOwner from "./AboutOwner";
import Memo from "./Memo";
import * as S from "./styles";
import { InnerContainer } from "../styles";

const DogInfo = ({ dogId }: { dogId: number }) => {
  const { data, refetch } = useGetDogDetail(dogId);

  return (
    <InnerContainer>
      <AboutDog data={data.dogInfo} />

      <AboutOwner data={data.memberInfo} />

      <Memo memo={data.dogInfo.dogMemo} id={data.dogInfo.dogId} refetch={refetch} />

      <S.AlbumWrapper>
        <Text typo="body2_16_B" color="darkBlack">
          사진 앨범
        </Text>
        <S.Albums>
          {/* 사진이 있는경우 앨범 없을 경우 텍스트 */}
          {/* FIXME: 정확한 typo 토큰 모르겠음. 피그마 확인 필요! */}
          <Text typo="body2_16_R" color="gray_3">
            앨범에 등록된 사진이 없습니다
          </Text>
        </S.Albums>
      </S.AlbumWrapper>
    </InnerContainer>
  );
};

export default DogInfo;
