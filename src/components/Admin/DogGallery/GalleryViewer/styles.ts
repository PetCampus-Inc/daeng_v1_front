import styled from "styled-components";

export const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  position: relative;
  padding-top: 2rem;
  height: 100%;
`;

export const MainMediaDisplayWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: calc(100vh - 48px - 180px);
  margin-bottom: 1rem;
`;

export const MainMediaDisplayList = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
  height: 100%;
`;

export const MainMediaDisplay = styled.div`
  flex: 0 0 100%;
  height: 100%;
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
  display: inline-flex;
  overflow: hidden;
  padding-bottom: 0;
  padding-left: calc(50% - 1.7rem);
  padding-right: calc(50% - 1.7rem);
  gap: 4px;
`;

export const ThumbnailItemContainer = styled.div<{ $isSelected: boolean }>`
  width: 3.4rem;
  height: 4.5rem;
  display: flex;
  padding-left: ${({ $isSelected }) => ($isSelected ? "6px" : "0")};
  padding-right: ${({ $isSelected }) => ($isSelected ? "6px" : "0")};
  img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
  flex: 1;
  transition: all 0.2s;
`;
