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
`;

export const StyledCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 3%;
  overflow-y: auto;
`;
