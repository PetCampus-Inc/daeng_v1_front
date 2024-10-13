import styled from "styled-components";

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  // gap: 4px;
`;

export const GridItemButton = styled.button`
  position: relative;
  border: 2px solid transparent;
  transition: ${({ theme }) => theme.transition.property.all}
    ${({ theme }) => theme.transition.duration.normal}
    ${({ theme }) => theme.transition.easing["ease-in-out"]};

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%);
    opacity: 0;
  }

  &:has(input:checked) {
    border-color: ${({ theme }) => theme.colors.primary_3};

    &:before {
      opacity: 1;
    }
  }
`;

export const GridItem = styled.div`
  aspect-ratio: 1 / 1;
  font-size: 0; // 인라인 여백 제거
`;

export const IconContainer = styled.div`
  position: absolute;
  bottom: 6px;
  left: 6px;
`;
