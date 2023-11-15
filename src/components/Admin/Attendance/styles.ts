import styled from "styled-components";

export const Container = styled.div`
  height: 85vh;
  width: 100%;
  margin-top: 5vh;
`;

export const StyledHeadWrapper = styled.div`
  height: 25%;
  padding-left: 4%;
  padding-right: 4%;
`;

export const StyledMainWrapper = styled.div`
  display: flex;
  height: 50%;
  width: 100%;
  margin-top: 15%;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTitleWrapper = styled.div``;

export const StyledButtonWrapper = styled.div`
  display: flex;
  width: 35%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledImage = styled.img<{
  src: string;
  alt: string;
}>`
  margin-right: 3%;
`;

export const StyledListWrapper = styled.div`
  width: 100%;
  height: 75%;
  margin-top: 3%;
  padding-bottom: 5%;
  padding-left: 4%;
  padding-right: 2%;
  position: relative;
`;

export const StyledBlur = styled.div<{ display: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 4.2%;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 1;
  pointer-events: none;
  display: ${(props) => props.display};
`;

export const StyledCardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  padding-right: 2%;
  gap: 4%;
  justify-content: center;
`;
