import styled from "styled-components";

export const ThumbnailContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  position: relative;
  height: 4.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;

  // 스크롤바 제거
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ThumbnailItemsContainer = styled.div`
  display: flex;
  overflow-x: auto;  
  padding-bottom: 0;
  position: absolute;

  left:48%;
  translateX(-48%);
  & > :last-child {
    padding-right: calc(100% - 78%);
  }
`;

export const ThumbnailItemWrapper = styled.div<{ isSelected: boolean }>`
  width: 3.5rem;
  height: 4.5rem;
  display: flex;
  padding-left: ${({ isSelected }) => (isSelected ? "6px" : "0")};
  padding-right: ${({ isSelected }) => (isSelected ? "6px" : "0")};
  img {
    width: 100%;
    object-fit: cover;
    height
  }
  flex: 1;
  margin-right: 4px;
  transition: all 0.2s;
`;
