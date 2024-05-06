import { ErrorBoundary } from "react-error-boundary";

import * as S from "./styles";

const FlexPhotosWithTime = () => {
  return (
    <ErrorBoundary fallback={<div>에러 발생</div>}>
      <S.FlexBox>
        {/* 여기 map */}
        <S.TimeAndPhotoContainer>
          32분 전
          <S.ImageFlexWrapper>
            <S.ImageBlock>
              <img src="https://via.placeholder.com/150" alt="dog" />
            </S.ImageBlock>
            <S.ImageBlock>
              <img src="https://via.placeholder.com/150" alt="dog" />
            </S.ImageBlock>
            <S.ImageBlock>
              <img src="https://via.placeholder.com/150" alt="dog" />
            </S.ImageBlock>
          </S.ImageFlexWrapper>
        </S.TimeAndPhotoContainer>
        {/* 여기 map */}
      </S.FlexBox>
    </ErrorBoundary>
  );
};

export default FlexPhotosWithTime;
