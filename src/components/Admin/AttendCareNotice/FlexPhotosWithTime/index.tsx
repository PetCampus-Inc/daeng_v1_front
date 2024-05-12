import { format } from "date-fns";
import useGetMainAlbum from "hooks/api/member/useGetMainAlbum";
import { ErrorBoundary } from "react-error-boundary";
import { IMainAlbumData } from "types/member/home.types";
import { changeDateToString } from "utils/date";

import * as S from "./styles";

const FlexPhotosWithTime = () => {
  const { data } = useGetMainAlbum({ dogId: 2, date: format(new Date(), "yyyy-MM-dd") });

  // TODO: 사진 없는 경우 디자인 수정
  return (
    <ErrorBoundary fallback={<div>에러 발생</div>}>
      <S.FlexBox>
        {!data
          ? "사진이 없습니다"
          : data.map((arr: IMainAlbumData[]) => {
              console.log(arr);
              return (
                <S.TimeAndPhotoContainer>
                  {changeDateToString(arr[0].createdTime)}
                  <S.ImageFlexWrapper>
                    {arr.map((item: IMainAlbumData) => {
                      return (
                        <S.ImageBlock>
                          <img src={item.imageUri} alt={`${item.imageId}번`} />
                        </S.ImageBlock>
                      );
                    })}
                  </S.ImageFlexWrapper>
                </S.TimeAndPhotoContainer>
              );
            })}
      </S.FlexBox>
    </ErrorBoundary>
  );
};

export default FlexPhotosWithTime;