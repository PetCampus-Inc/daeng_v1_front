import { Image } from "components/common/Image";
import styled from "styled-components";

export const ImageList = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledImage = styled.div`
  border-radius: 0.5rem;
  max-width: 25%;
  overflow: hidden;
`;
