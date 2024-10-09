import styled from "styled-components";

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
