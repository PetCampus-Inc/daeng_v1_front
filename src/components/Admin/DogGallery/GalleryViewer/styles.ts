import styled from "styled-components";

export const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  position: relative;
  padding-top: 2rem;
  height: 100%;
`;

export const MainMediaDisplay = styled.div`
  height: calc(100vh - 48px - 180px);
  margin-bottom: 1rem;
`;

export const SelectedMediaImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const ThumbnailListWrapper = styled.div`
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

export const ThumbnailItemsList = styled.div`
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

export const ThumbnailItemContainer = styled.div<{ $isSelected: boolean }>`
  width: 3.5rem;
  height: 4.5rem;
  display: flex;
  padding-left: ${({ $isSelected }) => ($isSelected ? "6px" : "0")};
  padding-right: ${({ $isSelected }) => ($isSelected ? "6px" : "0")};
  img {
    width: 100%;
    object-fit: cover;
    height
  }
  flex: 1;
  margin-right: 4px;
  transition: all 0.2s;
`;
