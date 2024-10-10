import styled from "styled-components";

export const ThumbnailContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  scroll-snap-type: x mandatory; // 스크롤 스냅 활성화
  position: relative;
  height: 4.5rem;
  overflow-x: auto;

  // 스크롤바 제거
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 1rem;
`;

export const ThumbnailItemsContainer = styled.div<{ width: string }>`
  display: flex;
  overflow-x: auto;  
  padding-bottom: 0;
  scroll-snap-type: x mandatory; // X축 스크롤 스냅 활성화
  scroll-padding: 50%; // 중앙에 정렬되도록 스크롤 패딩 설정
  position: absolute;
  left:48%;
  translateX(-48%);
`;

export const ThumbnailItemWrapper = styled.div<{ isSelected: boolean }>`
  width: 3.5rem;
  height: 4.5rem;
  display: flex;
  scroll-snap-align: center; // 선택된 요소가 중앙에 위치하도록 설정
  padding-left: ${({ isSelected }) => (isSelected ? "6px" : "0")};
  padding-right: ${({ isSelected }) => (isSelected ? "6px" : "0")};
  img {
    width: 100%;
  }
  flex: 1;
  margin-right: 4px;
  transition: all 0.2s;
`;
