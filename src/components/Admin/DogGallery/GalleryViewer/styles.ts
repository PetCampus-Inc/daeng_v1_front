import styled from "styled-components";

export const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 48px);
  background-color: #f6f6f6;
  gap: 1rem;
  position: relative;
`;

export const DisplayContainer = styled.div`
  margin-top: 2rem;
  height: calc(100% - 18%);
`;

export const DisplayMedia = styled.img`
  width: 100%;
  height: 100%;
`;

export const ThumbnailContainer = styled.div`
  background-color: #fff;
  width: 100%;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
`;

export const ThumbnailItemContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 8px;
`;

export const Thumbnail = styled.img<{ isSelected: boolean }>`
  width: 3.5rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
`;

export const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
`;
