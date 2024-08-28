import styled from "styled-components";

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  height: 100%;
  width: 100%;
  padding: 24px 16px 48px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
