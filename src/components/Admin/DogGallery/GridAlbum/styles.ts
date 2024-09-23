import styled from "styled-components";

export const GridAlbumContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3rem;
  padding: 2rem 0 7rem;

  .inner {
    gap: 0.6rem;
  }
`;

export const GridAlbumSection = styled.div``;

export const GridPictures = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  position: fixed;
  background-color: ${(props) => props.theme.colors.white};
  bottom: 0;
  width: 100%;
  padding: 0.8rem 1rem 2rem;
  transition: all 140ms ease-in-out;
  transform: translateY(100%);

  &[data-state-active="true"] {
    transform: translateY(0);
  }
`;
